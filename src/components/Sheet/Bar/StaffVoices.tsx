import { useRecoilState, useSetRecoilState } from "recoil";
import { notePadding } from "../../../constants";
import { barsState, selectedElementState } from "../../../NoteInputState";
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
  barNumber: number;
  beatPosition: number;
  element: NoteElement;
}
function PreviewElement({
  barNumber,
  beatPosition,
  element,
}: PreviewElementProps) {
  const position = calculatePreviewElementPosition(element);
  const [bars, setBars] = useRecoilState(barsState);
  return (
    <StaffElement
      element={element}
      position={position}
      sx={{ fill: "green" }}
      onClick={() => {
        const barsBefore = bars.slice(0, barNumber);
        const barsAfter = bars.slice(barNumber + 1);

        const currentBar = bars[barNumber];
        const beats = currentBar.beats || [];
        const currentBeat = beats.find(
          ({ beatPosition: currentBeatPosition }) =>
            currentBeatPosition === beatPosition
        );
        if (!currentBeat) return;
        const newCurrentBeat = {
          ...currentBeat,
          [element.voice]: element,
        };
        const newCurrentBar = {
          ...currentBar,
          beats: [
            ...beats.filter(
              ({ beatPosition: currentBeatPosition }) =>
                currentBeatPosition !== beatPosition
            ),
            newCurrentBeat,
          ],
        };
        setBars([...barsBefore, newCurrentBar, ...barsAfter]);
      }}
    />
  );
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
      {previewElement ? (
        <PreviewElement
          barNumber={barNumber}
          beatPosition={beatPosition}
          element={previewElement}
        />
      ) : null}
    </StaffBox>
  );
}
