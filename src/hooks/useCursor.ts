import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputVoiceState,
  mouseOverBeatState,
  previewNoteOctaveState,
  previewNoteSymbolState,
  selectedBarNumberState as selectedBarNumberState,
  selectedBeatPositionState,
} from "../NoteInputState";
import { Line } from "../types";
import { getBeatId, getNotePitchByCursorPositon } from "../utils";

interface UseCursorParams {
  lines: Line[];
}
export function useCursor({ lines }: UseCursorParams) {
  const [offsetTop, setOffsetTop] = useState(0);
  const [previewNoteSymbol, setPreviewNoteSymbol] = useRecoilState(
    previewNoteSymbolState
  );
  const [previewNoteOctave, setPreviewNoteOctave] = useRecoilState(
    previewNoteOctaveState
  );
  // const [previewNoteBar, setPreviewNoteBar] = useRecoilState(
  //   previewNoteOctaveState
  // );
  const mouseOverBeat = useRecoilValue(mouseOverBeatState);

  const voice = useRecoilValue(inputVoiceState);
  const selectedBarNumber = useRecoilValue(selectedBarNumberState);
  const selectedBeatPosition = useRecoilValue(selectedBeatPositionState);

  useEffect(() => {
    if (
      selectedBarNumber === null ||
      selectedBarNumber === undefined ||
      selectedBeatPosition === null ||
      selectedBeatPosition === undefined
    )
      return;

    const selectedBeatElement = document.getElementById(
      getBeatId(selectedBarNumber, selectedBeatPosition)
    );
    if (!selectedBeatElement) return;

    const updateOffset = (barElement: HTMLElement) => {
      const { top } = barElement.getBoundingClientRect();
      setOffsetTop(Math.round(top));
    };
    const onScroll = () => {
      updateOffset(selectedBeatElement);
    };

    const addEventListenerOnScroll = () => addEventListener("scroll", onScroll);
    const removeEventListenerOnScroll = () =>
      addEventListener("scroll", onScroll);

    updateOffset(selectedBeatElement);
    addEventListenerOnScroll();
    return removeEventListenerOnScroll;
  }, [selectedBarNumber, selectedBeatPosition, lines, setOffsetTop]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const relativeYPosition = e.clientY - offsetTop;
      const note = getNotePitchByCursorPositon({
        yPosition: relativeYPosition,
        voice,
      });

      setPreviewNoteSymbol(note.noteSymbol);
      setPreviewNoteOctave(note.octave);
    },
    [setPreviewNoteSymbol, setPreviewNoteOctave, offsetTop, voice]
  );

  useEffect(() => {
    if (
      !(
        mouseOverBeat?.barNumber === selectedBarNumber &&
        mouseOverBeat?.beatPosition === selectedBeatPosition
      )
    ) {
      return;
    }

    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [mouseOverBeat, selectedBarNumber, selectedBeatPosition, onMouseMove]);

  return {
    selectedBarNumber,
    selectedBeatPosition,
    previewNoteSymbol,
    previewNoteOctave,
  };
}
