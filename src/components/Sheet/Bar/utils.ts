import {
  NoteAltoPitch,
  NoteBassPitch,
  NoteDuration,
  NotePitch,
  NoteSopranoPitch,
  NoteSymbol,
  NoteSymbolEnum,
  NoteTenorPitch,
} from "../../../types/data";
import {
  EighthsNoteDown,
  EighthsNoteUp,
  HalfNoteDown,
  HalfNoteUp,
  QuarterNoteDown,
  QuarterNoteUp,
  SixteenthNoteDown,
  SixteenthNoteUp,
  ThirtySecondNoteDown,
  ThirtySecondNoteUp,
} from "../../Notation";
import {
  distanceBetweenConsecutiveNotes,
  distanceBetweenOctaveNotes,
  notesInOctave,
} from "../Staff";

export function getNoteUpSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteUp;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteUp;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteUp;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteUp;
  }
  return ThirtySecondNoteUp;
}

export function getNoteDownSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteDown;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteDown;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteDown;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteDown;
  }
  return ThirtySecondNoteDown;
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function calculateOffsetFromBottom({
  octave,
  voice,
}: CalculateNotePositionFromBottomParams) {
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

type CalculateNotePositionFromBottomParams =
  | (NoteSopranoPitch & { voice: "soprano" })
  | (NoteTenorPitch & { voice: "tenor" });
export function calculateNotePositionFromBottom(
  params: CalculateNotePositionFromBottomParams
) {
  return (
    calculateOffsetToLowestCNoteFromBottom(params.voice) +
    calculateOffsetFromBottom(params) +
    NoteSymbolEnum[params.noteSymbol] * distanceBetweenConsecutiveNotes
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

type CalculateNotePositionFromTopParams =
  | (NoteAltoPitch & { voice: "alto" })
  | (NoteBassPitch & { voice: "bass" });
export function calculateNotePositionFromTop({
  octave,
  noteSymbol,
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
  if (voice === "bass") {
    console.log(res);
  }
  return res;
}
