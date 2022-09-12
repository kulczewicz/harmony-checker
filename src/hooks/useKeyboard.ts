import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  barsState,
  inputVoiceState,
  previewNoteOctaveState,
  previewNoteSymbolState,
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../NoteInputState";
import { getSelectedElement } from "../utils/getSelectedElement.utils";
import { onKeyDownAction } from "../utils/onKeyDownAction.utils";
import { useUpdateBars } from "./useUpdateBars";

export function useKeyboard() {
  const { bars, updateBars } = useUpdateBars();
  const [selectedBarNumber, setSelectedBarNumber] = useRecoilState(
    selectedBarNumberState
  );
  const [selectedBeatPosition, setSelectedBeatPosition] = useRecoilState(
    selectedBeatPositionState
  );
  const setPreviewNoteSymbol = useSetRecoilState(previewNoteSymbolState);
  const setPreviewNoteOctave = useSetRecoilState(previewNoteOctaveState);
  const voice = useRecoilValue(inputVoiceState);

  useEffect(() => {
    if (selectedBarNumber === null || selectedBeatPosition === null) return;
    const selectedElement = getSelectedElement({
      bars,
      selectedBarNumber,
      selectedBeatPosition,
      voice,
    });
    if (!selectedElement) return;

    const onKeyDown = onKeyDownAction({
      bars,
      selectedElement,
      setSelectedBarNumber,
      setSelectedBeatPosition,
      updateBars,
      setPreviewNoteSymbol,
      setPreviewNoteOctave,
    });
    addEventListener("keydown", onKeyDown);
    return () => {
      removeEventListener("keydown", onKeyDown);
    };
  }, [
    bars,
    selectedBarNumber,
    setSelectedBarNumber,
    selectedBeatPosition,
    setSelectedBeatPosition,
    voice,
    updateBars,
    setPreviewNoteSymbol,
    setPreviewNoteOctave,
  ]);
}
