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

function getKeyNumberFromPitch({ octave, noteSymbol }: NotePitch) {
  const octaveOffset = (octave - contraOctaveNumber) * numberOfKeysInOctave;
  return (
    contraOctaveCNoteKeyNumber +
    octaveOffset +
    distanceFromCNoteToAnotherNoteInKeys[noteSymbol]
  );
}

export function getSignatureForNote(
  { noteSymbol, accidental }: NotePitch,
  signatureSymbolsForNotes: SignatureSymbolsForNotesInKey
): Pick<NoteElementProcessed, "showAccidental" | "absoluteSignature"> {
  const signatureSymbol = signatureSymbolsForNotes[noteSymbol];

  if (signatureSymbol === "flat") {
    if (accidental === "sharp") {
      return { showAccidental: true, absoluteSignature: "sharp" };
    }
    if (accidental === "natural") {
      return { showAccidental: true, absoluteSignature: null };
    }
    return { showAccidental: false, absoluteSignature: "flat" };
  }

  if (signatureSymbol === "sharp") {
    if (accidental === "flat") {
      return { showAccidental: true, absoluteSignature: "flat" };
    }
    if (accidental === "natural") {
      return { showAccidental: true, absoluteSignature: null };
    }
    return { showAccidental: false, absoluteSignature: "sharp" };
  }

  if (accidental === "flat") {
    return { showAccidental: true, absoluteSignature: "flat" };
  }
  if (accidental === "sharp") {
    return { showAccidental: true, absoluteSignature: "sharp" };
  }
  return { showAccidental: false, absoluteSignature: null };
}
