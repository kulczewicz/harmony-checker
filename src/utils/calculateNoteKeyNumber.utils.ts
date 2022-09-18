import {
  contraOctaveCNoteKeyNumber,
  contraOctaveNumber,
  distanceFromCNoteToAnotherNoteInKeys,
  numberOfKeysInOctave,
} from "../constants";
import {
  NoteElementProcessed,
  NotePitch,
  SignatureSymbolsForNotesInKey,
} from "../types";

export function getKeyNumberAndShowAccidentalForNote(
  { noteSymbol, octave, accidental }: NotePitch,
  signatureSymbolsForNotes: SignatureSymbolsForNotesInKey
): Pick<NoteElementProcessed, "keyNumber" | "showAccidental"> {
  const octaveOffset = (octave - contraOctaveNumber) * numberOfKeysInOctave;

  const signatureSymbol = signatureSymbolsForNotes[noteSymbol];
  const keyNumber =
    contraOctaveCNoteKeyNumber +
    octaveOffset +
    distanceFromCNoteToAnotherNoteInKeys[noteSymbol];

  if (signatureSymbol === "flat") {
    if (accidental === "sharp") {
      return { keyNumber: keyNumber + 1, showAccidental: true };
    }
    if (accidental === "natural") {
      return { keyNumber, showAccidental: true };
    }
    return { keyNumber: keyNumber - 1, showAccidental: false };
  }

  if (signatureSymbol === "sharp") {
    if (accidental === "flat") {
      return { keyNumber: keyNumber - 1, showAccidental: true };
    }
    if (accidental === "natural") {
      return { keyNumber, showAccidental: true };
    }
    return { keyNumber: keyNumber + 1, showAccidental: false };
  }

  if (accidental === "flat") {
    return { keyNumber: keyNumber - 1, showAccidental: true };
  }
  if (accidental === "sharp") {
    return { keyNumber: keyNumber + 1, showAccidental: true };
  }
  return { keyNumber, showAccidental: false };
}
