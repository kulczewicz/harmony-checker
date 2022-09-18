import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  keySignatureSymbolsState,
  musicKeyState,
  signatureSymbolsForNotesInKeyState,
} from "../NoteInputState";
import { MusicKey } from "../types";
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
