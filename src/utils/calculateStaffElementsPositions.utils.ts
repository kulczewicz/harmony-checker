import {
  consecutiveNotesDistance,
  noteHeadHight,
  notePadding,
  staffWithPaddingHeight,
} from "../constants";
import { NoteSymbolEnum, StaffElements } from "../types";
import {
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
} from "./calculateNotesPosition.utils";

// we need both values to calculate the position of rest, if the other element is the note
export function calculateStaffElementsVerticalPositions({
  topElement,
  bottomElement,
}: StaffElements) {
  // where we put rest
  const distanceFromEdgeToMiddlePlusTwoNots =
    staffWithPaddingHeight / 2 + noteHeadHight;

  const topElementFromBottom =
    topElement?.type === "note"
      ? calculateNotePositionFromBottom(topElement)
      : distanceFromEdgeToMiddlePlusTwoNots;
  const bottomElementFromTop =
    bottomElement?.type === "note"
      ? calculateNotePositionFromTop(bottomElement)
      : distanceFromEdgeToMiddlePlusTwoNots;

  if (topElement?.type === "note" && bottomElement?.type === "rest") {
    const restPositionFromTop = staffWithPaddingHeight - topElementFromBottom;
    // useful for whole and half rests
    const restPositionFromTopRoundedToNearestLine =
      Math.floor(restPositionFromTop / noteHeadHight) * noteHeadHight +
      consecutiveNotesDistance;

    return {
      topElementFromBottom,
      bottomElementFromTop: Math.max(
        restPositionFromTopRoundedToNearestLine + noteHeadHight,
        bottomElementFromTop
      ),
    };
  }
  if (topElement?.type === "rest" && bottomElement?.type === "note") {
    const restPositionFromBottom =
      staffWithPaddingHeight - bottomElementFromTop;
    const restPositionFromTopRoundedToNearestLine =
      Math.floor(restPositionFromBottom / noteHeadHight) * noteHeadHight +
      consecutiveNotesDistance;
    return {
      topElementFromBottom: Math.max(
        restPositionFromTopRoundedToNearestLine + noteHeadHight,
        topElementFromBottom
      ),
      bottomElementFromTop,
    };
  }

  // both are either notes or rests and we already calculated that
  return { topElementFromBottom, bottomElementFromTop };
}

export function calculateStaffElementsHorizontalPositions({
  topElement,
  bottomElement,
}: StaffElements) {
  const offsetFromLeft = notePadding;
  const result = {
    topElementLeftOffset: offsetFromLeft,
    bottomElementLeftOffset: offsetFromLeft,
  };
  if (
    !(topElement?.type === "note" && bottomElement?.type === "note") ||
    bottomElement.pitch.octave < topElement.pitch.octave
  ) {
    return result;
  }

  const topBottomDifference =
    NoteSymbolEnum[topElement.pitch.noteSymbol] -
    NoteSymbolEnum[bottomElement.pitch.noteSymbol];
  const notesAreNextToEachOtherInSameOctave =
    bottomElement.pitch.octave === topElement.pitch.octave &&
    (topBottomDifference === 1 || topBottomDifference === 0);

  const notesAreNextToEachOtherInConsecutiveOctaves =
    topElement.pitch.octave === bottomElement.pitch.octave + 1 &&
    topElement.pitch.noteSymbol === "B" &&
    bottomElement.pitch.noteSymbol === "C";

  if (
    notesAreNextToEachOtherInSameOctave ||
    notesAreNextToEachOtherInConsecutiveOctaves
  ) {
    result.bottomElementLeftOffset = offsetFromLeft + 15;
  }

  // just in case we will allow voice crossing in the future
  if (
    (bottomElement.pitch.octave === topElement.pitch.octave &&
      topBottomDifference < 0) ||
    topElement.pitch.octave < bottomElement.pitch.octave
  ) {
    result.topElementLeftOffset = offsetFromLeft + 13;
  }
  return result;
}
