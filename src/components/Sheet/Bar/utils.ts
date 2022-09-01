import {
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
  NoteOctave,
  NotePitch,
  NoteSymbol,
  NoteSymbolEnum,
  NoteSymbolFromTopEnum,
  Voice,
} from "../../../types";
import {
  consecutiveNotesDistance,
  octaveNotesDistance,
  noteHeadHight,
  staffWithPaddingHeight,
} from "../Staff";

export const getBarId = (barNumber: number) => `bar-${barNumber}`;
export const getLineId = (lineNumber: number) => `line-${lineNumber}`;

export const getBeatId = (barNumber: number, beatPosition: number) =>
  `beat-${barNumber}-${beatPosition}`;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

const lowestNoteInViolinStaff: NotePitch = {
  noteSymbol: "F",
  octave: 3,
};
const lowestNoteInBassStaff: NotePitch = {
  noteSymbol: "A",
  octave: 1,
};

interface CalculateNotePositionParams {
  pitch: NotePitch;
  voice: Voice;
}

export function calculateNotePositionFromBottom({
  pitch: { octave, noteSymbol },
  voice,
}: CalculateNotePositionParams) {
  const lowestNoteInStaff =
    voice === "soprano" || voice === "alto"
      ? lowestNoteInViolinStaff
      : lowestNoteInBassStaff;

  if (octave === lowestNoteInStaff.octave) {
    const lowestNoteInStaffFromBottom =
      NoteSymbolEnum[lowestNoteInStaff.noteSymbol];
    return (
      (NoteSymbolEnum[noteSymbol] - lowestNoteInStaffFromBottom) *
      consecutiveNotesDistance
    );
  }

  const lowestOctaveOffset =
    (NoteSymbolFromTopEnum[lowestNoteInStaff.noteSymbol] + 1) *
    consecutiveNotesDistance;
  const octaveOffset =
    (octave - lowestNoteInStaff.octave - 1) * octaveNotesDistance;
  const noteOffSet = NoteSymbolEnum[noteSymbol] * consecutiveNotesDistance;
  return lowestOctaveOffset + octaveOffset + noteOffSet;
}

const highestNoteInViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 6,
};
const highestNoteInBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 4,
};

export function calculateNotePositionFromTop({
  pitch: { octave, noteSymbol },
  voice,
}: CalculateNotePositionParams) {
  const highestNoteInStaff =
    voice === "soprano" || voice === "alto"
      ? highestNoteInViolinStaff
      : highestNoteInBassStaff;

  // highest notes in staff aren't just last note in octave (B)
  // so we have to make an exception for that
  if (octave === highestNoteInStaff.octave) {
    const highestNoteInStaffFromTop =
      NoteSymbolFromTopEnum[highestNoteInStaff.noteSymbol];
    return (
      (NoteSymbolFromTopEnum[noteSymbol] - highestNoteInStaffFromTop) *
      consecutiveNotesDistance
    );
  }

  const highestOctaveOffset =
    (NoteSymbolEnum[highestNoteInStaff.noteSymbol] + 1) *
    consecutiveNotesDistance;
  const octaveOffset =
    (highestNoteInStaff.octave - 1 - octave) * octaveNotesDistance;
  const noteOffSet =
    NoteSymbolFromTopEnum[noteSymbol] * consecutiveNotesDistance;

  return highestOctaveOffset + octaveOffset + noteOffSet;
}

type CalculateStaffElementsPositionsParams =
  | {
      upperElement?: ElementSoprano;
      lowerElement?: ElementAlto;
    }
  | {
      upperElement?: ElementTenor;
      lowerElement?: ElementBass;
    };
// we need both values to calculate the position of rest, if the other element is the note
export function calculateStaffElementsPositions({
  upperElement,
  lowerElement,
}: CalculateStaffElementsPositionsParams) {
  // where we put rest
  const distanceFromEdgeToMiddlePlusTwoNots =
    staffWithPaddingHeight / 2 + noteHeadHight;

  const upperElementFromBottom =
    upperElement?.type === "note"
      ? calculateNotePositionFromBottom(upperElement)
      : distanceFromEdgeToMiddlePlusTwoNots;
  const lowerElementFromTop =
    lowerElement?.type === "note"
      ? calculateNotePositionFromTop(lowerElement)
      : distanceFromEdgeToMiddlePlusTwoNots;

  if (upperElement?.type === "note" && lowerElement?.type === "rest") {
    console.log({
      staffWithPaddingHeight,
      upperElementFromBottom,
      consecutiveNotesDistance,
    });

    const restPositionFromTop = staffWithPaddingHeight - upperElementFromBottom;
    // useful for whole and half rests
    const restPositionFromTopRoundedToNearestLine =
      Math.floor(restPositionFromTop / noteHeadHight) * noteHeadHight +
      consecutiveNotesDistance;

    return {
      upperElementFromBottom,
      lowerElementFromTop: Math.max(
        restPositionFromTopRoundedToNearestLine + noteHeadHight,
        lowerElementFromTop
      ),
    };
  }
  if (upperElement?.type === "rest" && lowerElement?.type === "note") {
    const restPositionFromBottom = staffWithPaddingHeight - lowerElementFromTop;
    const restPositionFromTopRoundedToNearestLine =
      Math.floor(restPositionFromBottom / noteHeadHight) * noteHeadHight +
      consecutiveNotesDistance;
    return {
      upperElementFromBottom: Math.max(
        restPositionFromTopRoundedToNearestLine + noteHeadHight,
        upperElementFromBottom
      ),
      lowerElementFromTop,
    };
  }

  // both are either notes or rests and we already calculated that
  return { upperElementFromBottom, lowerElementFromTop };
}

function getRangeForVoice(voice: Voice): {
  lowest: NotePitch;
  highest: NotePitch;
} {
  if (voice === "soprano") {
    return {
      lowest: { octave: 4, noteSymbol: "C" },
      highest: { octave: 5, noteSymbol: "A" },
    };
  }
  if (voice === "alto") {
    return {
      lowest: { octave: 3, noteSymbol: "F" },
      highest: { octave: 5, noteSymbol: "D" },
    };
  }
  if (voice === "tenor") {
    return {
      lowest: { octave: 3, noteSymbol: "C" },
      highest: { octave: 4, noteSymbol: "G" },
    };
  }
  return {
    lowest: { octave: 2, noteSymbol: "E" },
    highest: { octave: 4, noteSymbol: "E" },
  };
}

interface GetNoteByCursorPositonInBarParams {
  yPosition: number;
  voice: Voice;
}
export function getNoteByCursorPositon({
  yPosition,
  voice,
}: GetNoteByCursorPositonInBarParams): NotePitch {
  const highestNoteInStaff =
    voice === "soprano" || voice === "alto"
      ? highestNoteInViolinStaff
      : highestNoteInBassStaff;

  const { highest, lowest } = getRangeForVoice(voice);

  const initialOffset =
    (voice === "soprano" || voice === "alto" ? 0 : staffWithPaddingHeight) +
    consecutiveNotesDistance / 2 +
    calculateNotePositionFromTop({
      pitch: { octave: highest.octave, noteSymbol: "B" },
      voice,
    });

  let octave: NoteOctave = highest.octave;

  const highestNoteOffset =
    initialOffset +
    NoteSymbolFromTopEnum[highest.noteSymbol] * consecutiveNotesDistance;

  if (yPosition <= highestNoteOffset) {
    return highest;
  }

  while (octave >= lowest.octave) {
    const highestNoteOctave =
      voice === "soprano" || voice === "alto"
        ? highestNoteInStaff.octave - 1
        : highestNoteInStaff.octave;
    const offset =
      initialOffset + (highestNoteOctave - octave) * octaveNotesDistance;
    const offsetTo =
      octave === lowest.octave
        ? offset +
          (NoteSymbolFromTopEnum[lowest.noteSymbol] + 1) *
            consecutiveNotesDistance
        : offset + octaveNotesDistance;

    if (yPosition < offsetTo) {
      const noteNumberFromTheTop = Math.floor(
        (yPosition - offset) / consecutiveNotesDistance
      );
      return {
        octave,
        noteSymbol: NoteSymbolFromTopEnum[noteNumberFromTheTop] as NoteSymbol,
      };
    }
    octave--;
  }
  return lowest;
}
