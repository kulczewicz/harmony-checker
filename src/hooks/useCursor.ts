import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  barsState,
  inputDotOnState,
  inputElementState,
  inputVoiceState,
  mouseOverBeatState,
  selectedBarNumberState as selectedBarNumberState,
  selectedBeatPositionState,
} from "../NoteInputState";
import { NoteElement, NoteOctave, NoteSymbol, SelectedElement } from "../types";
import { getBarId, getNotePitchByCursorPositon } from "../utils";
import { getSelectedElement } from "../utils/getSelectedElement.utils";
import { onKeyDownAction } from "../utils/onKeyDownAction.utils";
import { useUpdateBars } from "./useUpdateBars";

interface PreviewElement {
  barNumber: number;
  data: {
    beatPosition: number;
    element: NoteElement;
  };
}

export function useCursor() {
  const [bars, setBars] = useRecoilState(barsState);
  const [offsetTop, setOffsetTop] = useState(0);
  const [previewBarNumber, setPreviewBarNumber] = useState<number>(0);
  const [previewBeatPosition, setPreviewBeatPosition] = useState<number>(0);
  const [previewNoteSymbol, setPreviewNoteSymbol] = useState<NoteSymbol | null>(
    null
  );
  const [previewNoteOctave, setPreviewNoteOctave] = useState<NoteOctave | null>(
    null
  );
  const [previewData, setPreviewData] = useState<PreviewElement | null>(null);
  const [inputDuration, setInputDuration] = useRecoilState(inputElementState);
  const [voice, setVoice] = useRecoilState(inputVoiceState);
  const [dotOn, setDotOn] = useRecoilState(inputDotOnState);
  const mouseOverBeat = useRecoilValue(mouseOverBeatState);

  const [selectedBarNumber, setSelectedBarNumber] = useRecoilState(
    selectedBarNumberState
  );
  const [selectedBeatPosition, setSelectedBeatPosition] = useRecoilState(
    selectedBeatPositionState
  );
  const { updateBars } = useUpdateBars();

  // useEffect(() => {
  //   console.log(mouseOverBeat);
  // }, [mouseOverBeat]);

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
  ]);

  // useEffect(() => {
  //   console.log({ note: previewNoteSymbol, octave: previewNoteOctave });
  // }, [previewNoteOctave, previewNoteSymbol]);

  useEffect(() => {
    if (!selectedBarNumber) return;

    const barElement = document.getElementById(getBarId(selectedBarNumber));
    if (!barElement) return;

    const updateOffset = (barElement: HTMLElement) => {
      const { top } = barElement.getBoundingClientRect();
      setOffsetTop(Math.round(top));
    };
    const onScroll = () => {
      updateOffset(barElement);
    };

    const addEventListenerOnScroll = () => addEventListener("scroll", onScroll);
    const removeEventListenerOnScroll = () =>
      addEventListener("scroll", onScroll);

    updateOffset(barElement);
    addEventListenerOnScroll();
    return removeEventListenerOnScroll;
  }, [selectedBarNumber, setOffsetTop]);

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

  // useEffect(() => {
  //   if (!previewNoteSymbol || !previewNoteOctave) {
  //     setPreviewData(null);
  //     return;
  //   }
  //   setPreviewData({
  //     barNumber: previewBarNumber,
  //     data: {
  //       beatPosition: previewBeatPosition,
  //       element: {
  //         type: "note",
  //         duration: {
  //           value: inputDuration.durationValue,
  //           dot: dotOn,
  //         },
  //         pitch: {
  //           noteSymbol: previewNoteSymbol,
  //           octave: previewNoteOctave,
  //         },
  //         voice,
  //       },
  //     },
  //   });
  // }, [
  //   previewNoteSymbol,
  //   previewNoteOctave,
  //   previewBeatPosition,
  //   inputDuration.durationValue,
  //   dotOn,
  //   voice,
  //   previewBarNumber,
  //   setPreviewData,
  // ]);

  // useEffect(() => {
  //   if (!selectedElement) return;

  //   const { barNumber, beatPosition, element } = selectedElement;
  //   setPreviewBarNumber(barNumber);
  //   setPreviewBeatPosition(beatPosition);
  //   const {
  //     type,
  //     duration: { value: durationValue, dot },
  //     voice,
  //   } = element;
  //   setVoice(voice);
  //   setInputDuration({ type, durationValue });
  //   if (dot) {
  //     setDotOn(true);
  //   }
  // }, [
  //   selectedElement,
  //   setVoice,
  //   setPreviewBarNumber,
  //   setPreviewBeatPosition,
  //   setInputDuration,
  //   setDotOn,
  // ]);

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

  // useEffect(() => {
  //   if (bars?.length === 0) return;

  //   const beatPositions = bars[previewBarNumber].beats.map(
  //     ({ beatPosition }) => beatPosition
  //   );
  //   beatPositions.forEach((beatPosition) => {
  //     const beatElement = document.getElementById(
  //       getBeatId(previewBarNumber, beatPosition)
  //     );
  //     beatElement?.addEventListener("mouseenter", () => {
  //       setPreviewBeatNumber(beatPosition);
  //     });
  //   });
  // }, [previewBarNumber, bars, setPreviewBeatNumber]);

  // useEffect(() => {
  //   const barNumbers = bars.map(({ barNumber }) => barNumber);
  //   barNumbers.forEach((barNumber) => {
  //     const barElement = document.getElementById(getBarId(barNumber));
  //     barElement?.addEventListener("mouseenter", () => {
  //       setPreviewBarNumber(barNumber);
  //     });
  //   });
  // }, [bars, setPreviewBarNumber]);

  return {
    selectedBarNumber,
    selectedBeatPosition,
    previewNoteSymbol,
    previewNoteOctave,
  };
}
