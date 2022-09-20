import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  barsState,
  inputElementTypeState,
  inputVoiceState,
  previewNoteOctaveState,
  previewNoteSymbolState,
  selectedAccidentalState,
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
  const setInputElementType = useSetRecoilState(inputElementTypeState);
  const setSelectedAccidental = useSetRecoilState(selectedAccidentalState);
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
    const onKeyDown = onKeyDownAction({
      bars,
      currentElement: selectedElement?.element,
      selectedBarNumber,
      selectedBeatPosition,
      setSelectedBarNumber,
      setSelectedBeatPosition,
      updateBars,
      setPreviewNoteSymbol,
      setPreviewNoteOctave,
    });
    addEventListener("keydown", onKeyDown);

    if (selectedElement) {
      setInputElementType({
        type: selectedElement?.element.type,
        noteValue: selectedElement?.element.duration.value,
      });
      if (
        selectedElement?.element.type === "note" &&
        selectedElement?.element.pitch.accidental
      ) {
        setSelectedAccidental(
          selectedElement?.element.pitch.accidental ?? null
        );
      } else {
        setSelectedAccidental(null);
      }
    }

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
    setInputElementType,
    setSelectedAccidental,
  ]);
}
