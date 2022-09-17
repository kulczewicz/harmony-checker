import { useEffect, useState } from "react";
import {
  KeySignatureSymbols,
  MusicKey,
  SignatureSymbolsForNotesInKey,
} from "../types";
import {
  getKeySignatureSymbols,
  getSignatureSymbolsForNotesInKey,
} from "../utils/keySignature.utils";

export function useMusicKey() {
  const [musicKey, setMusicKey] = useState<MusicKey>({
    mode: "major",
    note: "C",
    signature: null,
  });
  const [keySignatureSymbols, setKeySignatureSymbols] =
    useState<KeySignatureSymbols | null>(null);
  const [signatureSymbolsForNotesInKey, setSignatureSymbolsForNotesInKey] =
    useState<SignatureSymbolsForNotesInKey>({
      C: null,
      D: null,
      E: null,
      F: null,
      G: null,
      A: null,
      B: null,
    });

  const updateMusicKey = (newKey: MusicKey) => {
    const signatureSymbolsForNotes = getSignatureSymbolsForNotesInKey(newKey);
    const keySignatureSymbols = getKeySignatureSymbols(
      signatureSymbolsForNotes
    );

    setSignatureSymbolsForNotesInKey(signatureSymbolsForNotes);
    setKeySignatureSymbols(keySignatureSymbols);
    setMusicKey(musicKey);
  };

  return {
    musicKey,
    keySignatureSymbols,
    signatureSymbolsForNotesInKey,
    updateMusicKey,
  };
}
