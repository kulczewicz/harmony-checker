import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  keySignatureSymbolsState,
  musicKeyState,
  signatureSymbolsForNotesInKeyState,
} from "../NoteInputState";
import {
  getKeySignatureSymbols,
  getSignatureSymbolsForNotesInKey,
} from "../utils/keySignature.utils";

export function useMusicKey() {
  const [musicKey, setMusicKey] = useRecoilState(musicKeyState);
  const [keySignatureSymbols, setKeySignatureSymbols] = useRecoilState(
    keySignatureSymbolsState
  );
  const [signatureSymbolsForNotesInKey, setSignatureSymbolsForNotesInKey] =
    useRecoilState(signatureSymbolsForNotesInKeyState);

  useEffect(() => {
    const signatureSymbolsForNotes = getSignatureSymbolsForNotesInKey(musicKey);
    const keySignatureSymbols = getKeySignatureSymbols(
      signatureSymbolsForNotes
    );
    setSignatureSymbolsForNotesInKey(signatureSymbolsForNotes);
    setKeySignatureSymbols(keySignatureSymbols);
  }, [musicKey, setSignatureSymbolsForNotesInKey, setKeySignatureSymbols]);

  return {
    musicKey,
    keySignatureSymbols,
    signatureSymbolsForNotesInKey,
  };
}
