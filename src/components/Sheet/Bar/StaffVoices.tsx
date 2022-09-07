import { useSetRecoilState } from "recoil";
import { notePadding } from "../../../constants";
import { selectedElementState } from "../../../NoteInputState";
import { NotationElement, NoteElement, StaffElements } from "../../../types";
import {
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "../../../utils";
import { StaffBox } from "../Staff";
import { StaffElement } from "./StaffElement";
import { StaffElementPosition } from "./types";

function calculatePreviewElementPosition(
  element: NoteElement
): StaffElementPosition {
  const offsetFromLeft = notePadding;
  return element.voice === "soprano" || element.voice === "tenor"
    ? {
        offsetFromLeft,
        direction: "up",
        offsetFromBottom: calculateNotePositionFromBottom(element),
      }
    : {
        offsetFromLeft,
        direction: "down",
        offsetFromTop: calculateNotePositionFromTop(element),
      };
}
interface PreviewElementProps {
  element: NoteElement;
}
function PreviewElement({ element }: PreviewElementProps) {
  const position = calculatePreviewElementPosition(element);
  return <StaffElement element={element} position={position} />;
}

interface StaffVoicesProps extends StaffElements {
  barNumber: number;
  beatPosition: number;
  previewElement: NoteElement | null;
  selectedElement: NotationElement | null;
}
export function StaffVoices({
  barNumber,
  beatPosition,
  previewElement,
  selectedElement,
  ...staffElements
}: StaffVoicesProps) {
  const setSelectedElement = useSetRecoilState(selectedElementState);
  const { topElementFromBottom, bottomElementFromTop } =
    calculateStaffElementsVerticalPositions(staffElements);
  const { topElementLeftOffset, bottomElementLeftOffset } =
    calculateStaffElementsHorizontalPositions(staffElements);
  const { topElement, bottomElement } = staffElements;

  const topElementSelected =
    selectedElement?.voice === "soprano" || selectedElement?.voice === "tenor";
  const bottomElementSelected =
    selectedElement?.voice === "alto" || selectedElement?.voice === "bass";

  return (
    <StaffBox sx={{ width: "100%" }}>
      {topElement ? (
        <StaffElement
          position={{
            direction: "up",
            offsetFromBottom: topElementFromBottom,
            offsetFromLeft: topElementLeftOffset,
          }}
          element={topElement}
          onClick={() =>
            setSelectedElement({
              barNumber,
              beatPosition,
              element: topElement,
            })
          }
          sx={{ fill: topElementSelected ? "blue" : "black" }}
        />
      ) : null}
      {bottomElement ? (
        <StaffElement
          position={{
            direction: "down",
            offsetFromTop: bottomElementFromTop,
            offsetFromLeft: bottomElementLeftOffset,
          }}
          element={bottomElement}
          onClick={() =>
            setSelectedElement({
              barNumber,
              beatPosition,
              element: bottomElement,
            })
          }
          sx={{ fill: bottomElementSelected ? "blue" : "black" }}
        />
      ) : null}
      {previewElement ? <PreviewElement element={previewElement} /> : null}
    </StaffBox>
  );
}
