import {
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
  NoteAlto,
  NoteBass,
  NotePitch,
  NoteSoprano,
  NoteSymbol,
  NoteSymbolEnum,
  NoteTenor,
} from "../../../types";
import {
  distanceBetweenConsecutiveNotes,
  distanceBetweenOctaveNotes,
  notesInOctave,
  staffWithPaddingHeight,
} from "../Staff";

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
  return relativeOctave * distanceBetweenOctaveNotes;
}

// C is the lowest note in the octave and both
function calculateOffsetToLowestCNoteFromBottom(voice: "soprano" | "tenor") {
  const notesUnderLowestCNoteInViolinKey = 4;
  const notesUnderLowestCNoteInBassKey = 2;
  return (
    distanceBetweenConsecutiveNotes *
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
    NoteSymbolEnum[pitch.noteSymbol] * distanceBetweenConsecutiveNotes
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

function getNoteNumberFromTheTop(noteSymbol: NoteSymbol) {
  return notesInOctave - NoteSymbolEnum[noteSymbol];
}

type CalculateNotePositionFromTopParams = Pick<
  NoteAlto | NoteBass,
  "pitch" | "voice"
>;
export function calculateNotePositionFromTop({
  pitch: { octave, noteSymbol },
  voice,
}: CalculateNotePositionFromTopParams) {
  const noteNumberFromTop = getNoteNumberFromTheTop(noteSymbol);
  const highestNoteInStaff =
    voice === "alto" ? highestNoteInViolinStaff : highestNoteInBassStaff;

  // highest notes in staff aren't just last note in octave (B)
  // so we have to make an exeption for that
  if (octave === highestNoteInStaff.octave) {
    const highestNoteInStaffFromTheTop = getNoteNumberFromTheTop(
      highestNoteInStaff.noteSymbol
    );
    return (
      (noteNumberFromTop - highestNoteInStaffFromTheTop) *
      distanceBetweenConsecutiveNotes
    );
  }

  const highestOctaveOffset =
    NoteSymbolEnum[highestNoteInStaff.noteSymbol] *
    distanceBetweenConsecutiveNotes;
  const octaveOffset =
    (highestNoteInStaff.octave - 1 - octave) * distanceBetweenOctaveNotes;
  const noteOffSet = noteNumberFromTop * distanceBetweenConsecutiveNotes;

  const res = highestOctaveOffset + octaveOffset + noteOffSet;
  return res;
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
    staffWithPaddingHeight / 2 + distanceBetweenConsecutiveNotes;

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
        staffWithPaddingHeight -
          offsetFromBottom +
          distanceBetweenConsecutiveNotes,
        offsetFromTop
      ),
    };
  }
  if (upperElement?.type === "rest" && lowerElement?.type === "note") {
    return {
      offsetFromBottom: Math.max(
        staffWithPaddingHeight -
          offsetFromTop +
          distanceBetweenConsecutiveNotes,
        offsetFromBottom
      ),
      offsetFromTop,
    };
  }

  // both are either notes or rests and we already calculated that
  return { offsetFromBottom, offsetFromTop };
}
