import { memo } from "react";
import { useSetRecoilState } from "recoil";
import { notePadding } from "../../../constants";
import { useBars } from "../../../hooks";
import { inputVoiceState } from "../../../NoteInputState";
import {
  NotationElementProcessed,
  NoteAccidental,
  NoteElement,
  NoteElementProcessed,
  Voice,
} from "../../../types";
import {
  BeatStaffPositions,
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
  calculateStaffElementsVerticalPositions,
} from "../../../utils";
import { accidentalWidth } from "../../Notation";
import { StaffBox } from "../Staff";
import { StaffElementWithAccidental } from "./StaffElement";
import { StaffElementPosition } from "./types";

function calculatePreviewElementPosition(
  element: NoteElement,
  showAccidental: boolean
): StaffElementPosition {
  const accidentalOffsetFromLeft = showAccidental ? notePadding : undefined;
  const offsetFromLeft = showAccidental
    ? notePadding + accidentalWidth
    : notePadding;
  return element.voice === "soprano" || element.voice === "tenor"
    ? {
        offsetFromLeft,
        accidentalOffsetFromLeft,
        direction: "up",
        offsetFromBottom: calculateNotePositionFromBottom(element),
      }
    : {
        offsetFromLeft,
        accidentalOffsetFromLeft,
        direction: "down",
        offsetFromTop: calculateNotePositionFromTop(element),
      };
}
interface PreviewElementProps {
  barNumber: number;
  beatPosition: number;
  element: NoteElement;
  showAccidental: boolean;
}
function PreviewElement({
  barNumber,
  beatPosition,
  element,
  showAccidental,
}: PreviewElementProps) {
  const position = calculatePreviewElementPosition(element, showAccidental);
  const { updateElementInBars } = useBars();
  return (
    <StaffElementWithAccidental
      position={position}
      element={element}
      isSelected={false}
      isPreview={true}
      isCausingError={false}
      setSelected={() =>
        updateElementInBars({ barNumber, beatPosition, element })
      }
      showAccidental={showAccidental}
    />
  );
}

interface StaffVoicesProps {
  type: "violin" | "bass";
  barNumber: number;
  beatPosition: number;
  selectedVoice: Voice | null;
  previewElement: NoteElement | null;
  showPreviewAccidental: boolean;
  topElement: NotationElementProcessed | undefined;
  topElementCausingError: boolean;
  bottomElement: NotationElementProcessed | undefined;
  bottomElementCausingError: boolean;
}
function StaffVoicesComponent({
  type,
  barNumber,
  beatPosition,
  selectedVoice,
  previewElement,
  showPreviewAccidental,
  topElementCausingError,
  bottomElementCausingError,
  ...staffElements
}: StaffVoicesProps) {
  const setSelectedVoice = useSetRecoilState(inputVoiceState);
  const { topElementFromBottom, bottomElementFromTop } =
    calculateStaffElementsVerticalPositions(staffElements);
  const { topElement, bottomElement } = staffElements;

  const topElementSelected =
    (selectedVoice === "soprano" && type === "violin") ||
    (selectedVoice === "tenor" && type === "bass");
  const bottomElementSelected =
    (selectedVoice === "alto" && type === "violin") ||
    (selectedVoice === "bass" && type === "bass");

  return (
    <StaffBox sx={{ width: "100%" }}>
      {topElement ? (
        <StaffElementWithAccidental
          position={{
            direction: "up",
            offsetFromBottom: topElementFromBottom,
            offsetFromLeft: topElement.leftOffset,
            accidentalOffsetFromLeft:
              (topElement.type === "note" && topElement.accidentalLeftOffset) ||
              undefined,
          }}
          element={topElement}
          showAccidental={
            topElement.type === "note" && topElement.showAccidental
          }
          isSelected={topElementSelected}
          isCausingError={topElementCausingError}
          setSelected={() =>
            setSelectedVoice(type === "violin" ? "soprano" : "tenor")
          }
        />
      ) : null}
      {bottomElement ? (
        <StaffElementWithAccidental
          position={{
            direction: "down",
            offsetFromTop: bottomElementFromTop,
            offsetFromLeft: bottomElement.leftOffset,
            accidentalOffsetFromLeft:
              (bottomElement.type === "note" &&
                bottomElement.accidentalLeftOffset) ||
              undefined,
          }}
          element={bottomElement}
          showAccidental={
            bottomElement.type === "note" && bottomElement.showAccidental
          }
          isSelected={bottomElementSelected}
          isCausingError={bottomElementCausingError}
          setSelected={() =>
            setSelectedVoice(type === "violin" ? "alto" : "bass")
          }
        />
      ) : null}
      {previewElement ? (
        <PreviewElement
          barNumber={barNumber}
          beatPosition={beatPosition}
          element={previewElement}
          showAccidental={showPreviewAccidental}
        />
      ) : null}
    </StaffBox>
  );
}

export const StaffVoices = memo(StaffVoicesComponent);
