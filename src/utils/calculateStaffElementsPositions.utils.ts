import {
  consecutiveNotesDistance,
  noteHeadHight,
  notePadding,
  staffWithPaddingHeight,
} from "../constants";
import { NotationElement, NoteSymbolEnum, StaffElements } from "../types";
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

export interface CalculateHorizontalPositionsParams {
  topElement: {
    element?: NotationElement;
    showAccidental?: boolean;
  };
  bottomElement: {
    element?: NotationElement;
    showAccidental?: boolean;
  };
}
export function calculateStaffElementsHorizontalPositions({
  topElement,
  bottomElement,
}: CalculateHorizontalPositionsParams) {
  const offsetFromLeft = notePadding;
  const result = {
    topElementLeftOffset: offsetFromLeft,
    bottomElementLeftOffset: offsetFromLeft,
  };
  if (
    !(
      topElement?.element?.type === "note" &&
      bottomElement?.element?.type === "note"
    ) ||
    bottomElement.element.pitch.octave < topElement.element.pitch.octave
  ) {
    return result;
  }

  const {
    element: { pitch: topPitch },
    showAccidental: showTopAccidental,
  } = topElement;
  const {
    element: { pitch: bottomPitch },
    showAccidental: showBottomAccidental,
  } = bottomElement;

  const topBottomDifference =
    NoteSymbolEnum[topPitch.noteSymbol] -
    NoteSymbolEnum[bottomPitch.noteSymbol];
  const notesAreNextToEachOtherInSameOctave =
    bottomPitch.octave === topPitch.octave &&
    (topBottomDifference === 1 || topBottomDifference === 0);

  const notesAreNextToEachOtherInConsecutiveOctaves =
    topPitch.octave === bottomPitch.octave + 1 &&
    topPitch.noteSymbol === "B" &&
    bottomPitch.noteSymbol === "C";

  if (
    notesAreNextToEachOtherInSameOctave ||
    notesAreNextToEachOtherInConsecutiveOctaves
  ) {
    result.bottomElementLeftOffset = offsetFromLeft + 15;
  }

  // just in case we will allow voice crossing in the future
  if (
    (bottomPitch.octave === topPitch.octave && topBottomDifference < 0) ||
    topPitch.octave < bottomPitch.octave
  ) {
    result.topElementLeftOffset = offsetFromLeft + 13;
  }
  return result;
}
