import {
  highestNoteWithoutLedgerLineBassStaff,
  highestNoteWithoutLedgerLineViolinStaff,
  lowestNoteWithoutLedgerLineBassStaff,
  lowestNoteWithoutLedgerLineViolinStaff,
} from "../constants/notes.constants";
import { Note, NoteSymbolEnum, NoteSymbolFromTopEnum } from "../types";

const linesFromStaff = (numOfLines: number) => Math.floor(numOfLines / 2);

export interface CalculateNumberOfLedgerLinesReturn {
  linesPosition: "inside" | "below" | "above";
  numberOfLines: number;
}
export function calculateNumberOfLedgerLines({
  pitch: { noteSymbol, octave },
  voice,
}: Note) {
  const isViolin = voice === "soprano" || voice === "alto";
  const lowestNote = isViolin
    ? lowestNoteWithoutLedgerLineViolinStaff
    : lowestNoteWithoutLedgerLineBassStaff;
  const highestNote = isViolin
    ? highestNoteWithoutLedgerLineViolinStaff
    : highestNoteWithoutLedgerLineBassStaff;

  const result: CalculateNumberOfLedgerLinesReturn = {
    linesPosition: "inside",
    numberOfLines: 0,
  };

  // staff itself is smaller than two octaves, so we cover all the notes without ledger lines
  // by just checking if the note belongs either to lowest or highest note octave and the notes themselves
  if (
    (octave === lowestNote.octave &&
      NoteSymbolEnum[noteSymbol] >= NoteSymbolEnum[lowestNote.noteSymbol]) ||
    (octave === highestNote.octave &&
      NoteSymbolEnum[noteSymbol] <= NoteSymbolEnum[highestNote.noteSymbol])
  ) {
    return result;
  }

  if (octave <= lowestNote.octave) {
    result.linesPosition = "below";
    if (octave === lowestNote.octave) {
      result.numberOfLines = linesFromStaff(
        NoteSymbolFromTopEnum[noteSymbol] -
          NoteSymbolFromTopEnum[lowestNote.noteSymbol]
      );
    } else {
      const firstOctaveOffset = NoteSymbolEnum[lowestNote.noteSymbol] + 1;
      const notePosition = NoteSymbolFromTopEnum[noteSymbol];
      result.numberOfLines = linesFromStaff(firstOctaveOffset + notePosition);
    }
    return result;
  }

  if (octave >= highestNote.octave) {
    result.linesPosition = "above";
    if (octave === highestNote.octave) {
      result.numberOfLines = linesFromStaff(
        NoteSymbolEnum[noteSymbol] - NoteSymbolEnum[highestNote.noteSymbol]
      );
    } else {
      const firstOctaveOffset =
        NoteSymbolFromTopEnum[highestNote.noteSymbol] + 1;
      const notePosition = NoteSymbolEnum[noteSymbol];
      result.numberOfLines = linesFromStaff(firstOctaveOffset + notePosition);
    }
  }

  return result;
}
