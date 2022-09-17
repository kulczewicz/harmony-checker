import {
  KeySignatureSymbols,
  KeySignatureNumberOfSymbols,
  KeySignatureSymbol,
  MusicKey,
  SignatureSymbolsForNotesInKey,
} from "../types";

export function getSignatureSymbolsForNotesInKey({
  mode,
  note,
  signature,
}: MusicKey) {
  const signatureSymbolsForNotesInKey: SignatureSymbolsForNotesInKey = {
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
    return signatureSymbolsForNotesInKey;
  }

  const sharpSignatureSymbolsForNotes = { ...signatureSymbolsForNotesInKey };

  sharpSignatureSymbolsForNotes.F = "sharp";
  if (
    ((mode === "major" && note === "G") ||
      (mode === "minor" && note === "E")) &&
    signature === null
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.C = "sharp";
  if (
    ((mode === "major" && note === "D") ||
      (mode === "minor" && note === "B")) &&
    signature === null
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.G = "sharp";
  if (
    (mode === "major" && note === "A" && signature === null) ||
    (mode === "minor" && note === "F" && signature === "sharp")
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.D = "sharp";
  if (
    (mode === "major" && note === "E" && signature === null) ||
    (mode === "minor" && note === "C" && signature === "sharp")
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.A = "sharp";
  if (
    (mode === "major" && note === "B" && signature === null) ||
    (mode === "minor" && note === "G" && signature === "sharp")
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.E = "sharp";
  if (
    (mode === "major" && note === "F" && signature === "sharp") ||
    (mode === "minor" && note === "D" && signature === "sharp")
  ) {
    return sharpSignatureSymbolsForNotes;
  }
  sharpSignatureSymbolsForNotes.B = "sharp";
  if (
    (mode === "major" && note === "C" && signature === "sharp") ||
    (mode === "minor" && note === "A" && signature === "sharp")
  ) {
    return sharpSignatureSymbolsForNotes;
  }

  const flatSignatureSymbolsForNotes = { ...signatureSymbolsForNotesInKey };

  flatSignatureSymbolsForNotes.B = "flat";
  if (
    ((mode === "major" && note === "F") ||
      (mode === "minor" && note === "D")) &&
    signature === null
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.E = "flat";
  if (
    (mode === "major" && note === "B" && signature === "flat") ||
    (mode === "minor" && note === "G" && signature === null)
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.A = "flat";
  if (
    (mode === "major" && note === "E" && signature === "flat") ||
    (mode === "minor" && note === "C" && signature === null)
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.D = "flat";
  if (
    (mode === "major" && note === "A" && signature === "flat") ||
    (mode === "minor" && note === "F" && signature === null)
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.G = "flat";
  if (
    (mode === "major" && note === "D" && signature === "flat") ||
    (mode === "minor" && note === "B" && signature === "flat")
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.C = "flat";
  if (
    (mode === "major" && note === "G" && signature === "flat") ||
    (mode === "minor" && note === "E" && signature === "flat")
  ) {
    return flatSignatureSymbolsForNotes;
  }
  flatSignatureSymbolsForNotes.F = "flat";
  if (
    (mode === "major" && note === "C" && signature === "flat") ||
    (mode === "minor" && note === "A" && signature === "flat")
  ) {
    return flatSignatureSymbolsForNotes;
  }

  return signatureSymbolsForNotesInKey;
}

export function getKeySignatureSymbols(
  signatureSymbolsForNotes: SignatureSymbolsForNotesInKey
): KeySignatureSymbols | null {
  const signatureSymbols = Object.values(signatureSymbolsForNotes).filter(
    (signature) => signature !== null
  );

  if (signatureSymbols.length === 0) {
    return null;
  }

  const [signatureSymbol] = signatureSymbols;

  return {
    signatureSymbol: signatureSymbol as KeySignatureSymbol,
    numberOfSymbols: signatureSymbols.length as KeySignatureNumberOfSymbols,
  };
}
