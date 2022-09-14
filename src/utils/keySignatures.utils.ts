import {
  KeySignature,
  KeySignatureNumberOfSymbols,
  KeySignatureSymbol,
  MusicKey,
  SignaturesForNotes,
} from "../types";

export function getSignaturesForNotesByKey({
  mode,
  note,
  signature,
}: MusicKey) {
  const signaturesForNotes: SignaturesForNotes = {
    C: null,
    D: null,
    E: null,
    F: null,
    G: null,
    A: null,
    B: null,
  };

  // going right by the circle of fifth
  if (
    ((mode === "major" && note === "C") ||
      (mode === "minor" && note === "A")) &&
    signature === null
  ) {
    return signaturesForNotes;
  }

  const sharpSignaturesForNotes = { ...signaturesForNotes };

  sharpSignaturesForNotes.F = "sharp";
  if (
    ((mode === "major" && note === "G") ||
      (mode === "minor" && note === "E")) &&
    signature === null
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.C = "sharp";
  if (
    ((mode === "major" && note === "D") ||
      (mode === "minor" && note === "B")) &&
    signature === null
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.G = "sharp";
  if (
    (mode === "major" && note === "A" && signature === null) ||
    (mode === "minor" && note === "F" && signature === "sharp")
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.D = "sharp";
  if (
    (mode === "major" && note === "E" && signature === null) ||
    (mode === "minor" && note === "C" && signature === "sharp")
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.A = "sharp";
  if (
    (mode === "major" && note === "B" && signature === null) ||
    (mode === "minor" && note === "G" && signature === "sharp")
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.E = "sharp";
  if (
    (mode === "major" && note === "F" && signature === "sharp") ||
    (mode === "minor" && note === "D" && signature === "sharp")
  ) {
    return sharpSignaturesForNotes;
  }
  sharpSignaturesForNotes.B = "sharp";
  if (
    (mode === "major" && note === "C" && signature === "sharp") ||
    (mode === "minor" && note === "A" && signature === "sharp")
  ) {
    return sharpSignaturesForNotes;
  }

  const flatSignaturesForNotes = { ...signaturesForNotes };

  flatSignaturesForNotes.B = "flat";
  if (
    ((mode === "major" && note === "F") ||
      (mode === "minor" && note === "D")) &&
    signature === null
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.E = "flat";
  if (
    (mode === "major" && note === "B" && signature === "flat") ||
    (mode === "minor" && note === "G" && signature === null)
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.A = "flat";
  if (
    (mode === "major" && note === "E" && signature === "flat") ||
    (mode === "minor" && note === "C" && signature === null)
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.D = "flat";
  if (
    (mode === "major" && note === "A" && signature === "flat") ||
    (mode === "minor" && note === "F" && signature === null)
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.G = "flat";
  if (
    (mode === "major" && note === "D" && signature === "flat") ||
    (mode === "minor" && note === "B" && signature === "flat")
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.C = "flat";
  if (
    (mode === "major" && note === "G" && signature === "flat") ||
    (mode === "minor" && note === "E" && signature === "flat")
  ) {
    return flatSignaturesForNotes;
  }
  flatSignaturesForNotes.F = "flat";
  if (
    (mode === "major" && note === "C" && signature === "flat") ||
    (mode === "minor" && note === "A" && signature === "flat")
  ) {
    return flatSignaturesForNotes;
  }

  return signaturesForNotes;
}

export function getKeySignatureByMusicKey(key: MusicKey): KeySignature | null {
  const signaturesForNotes = getSignaturesForNotesByKey(key);
  // no key signature
  const signatures = Object.values(signaturesForNotes).filter(
    (signature) => signature !== null
  );
  if (signatures.length === 0) {
    return null;
  }

  const [signature] = signatures;

  return {
    signature: signature as KeySignatureSymbol,
    numberOfSymbols: signatures.length as KeySignatureNumberOfSymbols,
  };
}
