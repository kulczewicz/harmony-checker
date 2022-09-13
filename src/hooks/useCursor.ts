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
  const mouseOverBeat = useRecoilValue(mouseOverBeatState);
  const voice = useRecoilValue(inputVoiceState);
  const selectedBarNumber = useRecoilValue(selectedBarNumberState);
  const selectedBeatPosition = useRecoilValue(selectedBeatPositionState);

  useEffect(() => {
    if (!mouseOverBeat) return;

    const previewBeatElement = document.getElementById(
      getBeatId(mouseOverBeat.barNumber, mouseOverBeat.beatPosition)
    );
    if (!previewBeatElement) return;

    const updateOffset = (barElement: HTMLElement) => {
      const { top } = barElement.getBoundingClientRect();
      setOffsetTop(Math.round(top));
    };
    const onScroll = () => {
      updateOffset(previewBeatElement);
    };

    const addEventListenerOnScroll = () => addEventListener("scroll", onScroll);
    const removeEventListenerOnScroll = () =>
      addEventListener("scroll", onScroll);

    updateOffset(previewBeatElement);
    addEventListenerOnScroll();
    return removeEventListenerOnScroll;
  }, [mouseOverBeat, lines, setOffsetTop]);

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
    document.addEventListener("mousemove", onMouseMove);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove]);

  return {
    selectedBarNumber,
    selectedBeatPosition,
    previewNoteSymbol,
    previewNoteOctave,
    mouseOverBeat,
  };
}
