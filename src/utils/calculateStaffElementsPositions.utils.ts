import { accidentalWidth } from "../components/Notation";
import { restWidths } from "../components/Notation/Rests";
import {
  consecutiveNotesDistance,
  noteHeadHight,
  noteHeadWidth,
  noteOffset,
  notePadding,
  notesInOctave,
  noteTailWidth,
  staffWithPaddingHeight,
} from "../constants";
import {
  NotationElement,
  NotePitch,
  NoteSymbolEnum,
  NoteSymbolFromTopEnum,
  NoteValue,
  StaffElements,
} from "../types";
import {
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
} from "./calculateNotesPosition.utils";

function calculateTwoNotesDistance(
  { noteSymbol: topNoteSymbol, octave: topOctave }: NotePitch,
  { noteSymbol: bottomNoteSymbol, octave: bottomOctave }: NotePitch
) {
  const octaveDifference = topOctave - bottomOctave;
  if (octaveDifference > 0) {
    return (
      (octaveDifference - 1) * notesInOctave +
      NoteSymbolEnum[topNoteSymbol] +
      NoteSymbolFromTopEnum[bottomNoteSymbol] +
      1
    );
  }
  if (octaveDifference < 0) {
    return (
      (octaveDifference + 1) * notesInOctave -
      NoteSymbolFromTopEnum[topNoteSymbol] -
      NoteSymbolEnum[bottomNoteSymbol] -
      1
    );
  }
  return NoteSymbolEnum[topNoteSymbol] - NoteSymbolEnum[bottomNoteSymbol];
}

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
  topElement?: NotationElement;
  showTopAccidental?: boolean;
  bottomElement?: NotationElement;
  showBottomAccidental?: boolean;
}

interface CalculateAccidentalsPositionsParams {
  topPitch: NotePitch;
  bottomPitch: NotePitch;
  topBottomDistance: number;
}
function calculateAccidentalsPositions({
  topPitch,
  bottomPitch,
  topBottomDistance,
}: CalculateAccidentalsPositionsParams) {
  // two notes accidents overlap
  if (
    topPitch.accidental &&
    bottomPitch.accidental &&
    Math.abs(topBottomDistance) < 6
  ) {
    if (topBottomDistance > 0) {
      return {
        topAccidentalPosition: accidentalWidth,
        bottomAccidentalPosition: 0,
        accidentalsWidth: accidentalWidth * 2,
      };
    }
    return {
      topAccidentalPosition: 0,
      bottomAccidentalPosition: accidentalWidth,
      accidentalsWidth: accidentalWidth * 2,
    };
  }
  if (topPitch.accidental || bottomPitch.accidental) {
    return {
      topAccidentalPosition: 0,
      bottomAccidentalPosition: 0,
      accidentalsWidth: accidentalWidth,
    };
  }
  return {
    topAccidentalPosition: 0,
    bottomAccidentalPosition: 0,
    accidentalsWidth: 0,
  };
}

interface ElementHorizontalPositions {
  topElementLeftOffset: number;
  topAccidentalLeftOffset?: number;
  bottomElementLeftOffset: number;
  bottomAccidentalLeftOffset?: number;
}
function calculateStaffElementsHorizontalPositions({
  topElement,
  showTopAccidental,
  bottomElement,
  showBottomAccidental,
}: CalculateHorizontalPositionsParams) {
  const offsetFromLeft = notePadding;
  const result: ElementHorizontalPositions = {
    topElementLeftOffset: offsetFromLeft,
    bottomElementLeftOffset: offsetFromLeft,
  };
  if (!(topElement?.type === "note" && bottomElement?.type === "note")) {
    if (showTopAccidental) {
      result.topAccidentalLeftOffset = offsetFromLeft;
      result.topElementLeftOffset += accidentalWidth;
      result.bottomElementLeftOffset += accidentalWidth;
    }
    if (showBottomAccidental) {
      result.bottomAccidentalLeftOffset = offsetFromLeft;
      result.topElementLeftOffset += accidentalWidth;
      result.bottomElementLeftOffset += accidentalWidth;
    }
    return result;
  }

  const { pitch: topPitch } = topElement;
  const { pitch: bottomPitch } = bottomElement;

  const topBottomDistance = calculateTwoNotesDistance(topPitch, bottomPitch);

  // bottom element on the right
  if (topBottomDistance === 0 || topBottomDistance === 1) {
    result.bottomElementLeftOffset += 15;
  }

  // voice crossing - top element on the right
  if (topBottomDistance < 0) {
    result.topElementLeftOffset += 13;
  }

  if (showTopAccidental || showBottomAccidental) {
    const {
      topAccidentalPosition,
      bottomAccidentalPosition,
      accidentalsWidth,
    } = calculateAccidentalsPositions({
      topPitch,
      bottomPitch,
      topBottomDistance,
    });
    result.topAccidentalLeftOffset = offsetFromLeft + topAccidentalPosition;
    result.topElementLeftOffset += accidentalsWidth;
    result.bottomAccidentalLeftOffset =
      offsetFromLeft + bottomAccidentalPosition;
    result.bottomElementLeftOffset += accidentalsWidth;
  }
  return result;
}

function calculateElementWidthWithRightPadding(element: NotationElement) {
  if (element.type === "rest") {
    return restWidths[element.duration.value] + notePadding;
  }
  if (
    (["eights", "sixteenth", "thirtySecond"] as NoteValue[]).includes(
      element.duration.value
    )
  ) {
    return noteTailWidth + noteOffset;
  }
  return noteHeadWidth + notePadding;
}

export interface BeatStaffPositions extends ElementHorizontalPositions {
  beatStaffWidth: number;
}
export function calculateBeatStaffPositions(
  params: CalculateHorizontalPositionsParams
): BeatStaffPositions {
  const { topElement, bottomElement } = params;
  const topElementWidthWithRightPadding = topElement
    ? calculateElementWidthWithRightPadding(topElement)
    : 0;
  const bottomElementWidthWithRightPadding = bottomElement
    ? calculateElementWidthWithRightPadding(bottomElement)
    : 0;

  const {
    topElementLeftOffset,
    topAccidentalLeftOffset,
    bottomElementLeftOffset,
    bottomAccidentalLeftOffset,
  } = calculateStaffElementsHorizontalPositions(params);

  const topElementWidth =
    topElementLeftOffset + topElementWidthWithRightPadding;
  const bottomElementWidth =
    bottomElementLeftOffset + bottomElementWidthWithRightPadding;

  return {
    topElementLeftOffset,
    topAccidentalLeftOffset,
    bottomElementLeftOffset,
    bottomAccidentalLeftOffset,
    beatStaffWidth: Math.max(topElementWidth, bottomElementWidth),
  };
}
