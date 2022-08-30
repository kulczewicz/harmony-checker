import {
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
  NoteAlto,
  NoteBass,
  NoteOctave,
  NotePitch,
  NoteSoprano,
  NoteSymbol,
  NoteSymbolEnum,
  NoteSymbolFromTopEnum,
  NoteTenor,
  Voice,
} from "../../../types";
import {
  consecutiveNotesDistance,
  octaveNotesDistance,
  noteHeadHight,
  notesInOctave,
  staffWithPaddingHeight,
} from "../Staff";

export const getBarId = (barNumber: number) => `bar-${barNumber}`;
export const getLineId = (lineNumber: number) => `line-${lineNumber}`;

export const getBeatId = (barNumber: number, beatPosition: number) =>
  `beat-${barNumber}-${beatPosition}`;

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

type CalculatePositionFromBottomParams = Pick<
  NoteSoprano | NoteTenor,
  "pitch" | "voice"
>;
function calculateOffsetFromBottom({
  pitch: { octave },
  voice,
}: CalculatePositionFromBottomParams) {
  const lowestViolinKeyOctave = 4;
  const lowestBassKeyOctave = 2;
  const relativeOctave =
    octave -
    (voice === "soprano" ? lowestViolinKeyOctave : lowestBassKeyOctave);
  return relativeOctave * octaveNotesDistance;
}

// C is the lowest note in the octave and both
function calculateOffsetToLowestCNoteFromBottom(voice: "soprano" | "tenor") {
  const notesUnderLowestCNoteInViolinKey = 4;
  const notesUnderLowestCNoteInBassKey = 2;
  return (
    consecutiveNotesDistance *
    (voice === "soprano"
      ? notesUnderLowestCNoteInViolinKey
      : notesUnderLowestCNoteInBassKey)
  );
}

export function calculateNotePositionFromBottom({
  pitch,
  voice,
}: CalculatePositionFromBottomParams) {
  return (
    calculateOffsetToLowestCNoteFromBottom(voice) +
    calculateOffsetFromBottom({ pitch, voice }) +
    NoteSymbolEnum[pitch.noteSymbol] * consecutiveNotesDistance
  );
}

const highestNoteInViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 6,
};
const highestNoteInBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 4,
};

interface CalculateNotePositionFromTopParams {
  pitch: NotePitch;
  voice: Voice;
}
export function calculateNotePositionFromTop({
  pitch: { octave, noteSymbol },
  voice,
}: CalculateNotePositionFromTopParams) {
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
  const distanceFromEdgeToMiddlePlusOneNote =
    staffWithPaddingHeight / 2 + consecutiveNotesDistance;

  const offsetFromBottom =
    upperElement?.type === "note"
      ? calculateNotePositionFromBottom(upperElement)
      : distanceFromEdgeToMiddlePlusOneNote;
  const offsetFromTop =
    lowerElement?.type === "note"
      ? calculateNotePositionFromTop(lowerElement)
      : distanceFromEdgeToMiddlePlusOneNote;

  if (upperElement?.type === "note" && lowerElement?.type === "rest") {
    return {
      offsetFromBottom,
      offsetFromTop: Math.max(
        staffWithPaddingHeight - offsetFromBottom + consecutiveNotesDistance,
        offsetFromTop
      ),
    };
  }
  if (upperElement?.type === "rest" && lowerElement?.type === "note") {
    return {
      offsetFromBottom: Math.max(
        staffWithPaddingHeight - offsetFromTop + consecutiveNotesDistance,
        offsetFromBottom
      ),
      offsetFromTop,
    };
  }

  // both are either notes or rests and we already calculated that
  return { offsetFromBottom, offsetFromTop };
}

// function calculateOffsetFromTop(note: NotePitch, highestNote: NotePitch) {
//   if (note.octave === highestNote.octave) {
//     return (
//       (NoteSymbolFromTopEnum[note.noteSymbol] -
//         NoteSymbolFromTopEnum[highestNote.noteSymbol]) *
//       consecutiveNotesDistance
//     );
//   }
//   NoteSymbolEnum[highestNote.noteSymbol];
// }

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
