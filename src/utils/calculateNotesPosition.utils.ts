import { consecutiveNotesDistance, octaveNotesDistance } from "../constants";
import {
  highestNoteInBassStaff,
  highestNoteInViolinStaff,
  lowestNoteInBassStaff,
  lowestNoteInViolinStaff,
} from "../constants/notes.constants";
import {
  NotePitch,
  NoteSymbolEnum,
  NoteSymbolFromTopEnum,
  Voice,
} from "../types";

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
