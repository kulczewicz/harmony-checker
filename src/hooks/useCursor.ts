import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { staffLineBeginningWidth } from "../components/Sheet/StaffLineBeginning";
import { sheetElementId } from "../constants";
import {
  inputDotOnState,
  inputElementState,
  inputVoiceState,
  selectedElementState,
} from "../NoteInputState";
import { Bar, NoteElement, NoteOctave, NoteSymbol } from "../types";
import { getBarId, getBeatId, getNotePitchByCursorPositon } from "../utils";

interface CursorParams {
  bars: Bar[];
}
interface PreviewElement {
  barNumber: number;
  data: {
    beatPosition: number;
    element: NoteElement;
  };
}

export function useCursor() {
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
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);

  useEffect(() => {
    if (
      selectedElement?.barNumber === undefined ||
      selectedElement?.barNumber === null
    ) {
      return;
    }

    const barElement = document.getElementById(
      getBarId(selectedElement.barNumber)
    );
    if (!barElement) {
      return;
    }

    const updateOffset = (barElement: HTMLElement) => {
      const { top } = barElement.getBoundingClientRect();
      setOffsetTop(top);
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
  }, [selectedElement?.barNumber, setOffsetTop]);

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
    if (!previewNoteSymbol || !previewNoteOctave) {
      setPreviewData(null);
      return;
    }
    setPreviewData({
      barNumber: previewBarNumber,
      data: {
        beatPosition: previewBeatPosition,
        element: {
          type: "note",
          duration: {
            value: inputDuration.durationValue,
            dot: dotOn,
          },
          pitch: {
            noteSymbol: previewNoteSymbol,
            octave: previewNoteOctave,
          },
          voice,
        },
      },
    });
  }, [
    previewNoteSymbol,
    previewNoteOctave,
    previewBeatPosition,
    inputDuration.durationValue,
    dotOn,
    voice,
    previewBarNumber,
    setPreviewData,
  ]);

  useEffect(() => {
    if (!selectedElement) return;

    const { barNumber, beatPosition, element } = selectedElement;
    setPreviewBarNumber(barNumber);
    setPreviewBeatPosition(beatPosition);
    const {
      type,
      duration: { value: durationValue, dot },
      voice,
    } = element;
    setVoice(voice);
    setInputDuration({ type, durationValue });
    if (dot) {
      setDotOn(true);
    }
  }, [
    selectedElement,
    setVoice,
    setPreviewBarNumber,
    setPreviewBeatPosition,
    setInputDuration,
    setDotOn,
  ]);

  useEffect(() => {
    if (!selectedElement) return;

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
    };
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
    const { barNumber, beatPosition } = selectedElement;

    const beatElement = document.getElementById(
      getBeatId(barNumber, beatPosition)
    );

    addEventListeners();
    beatElement?.addEventListener("mouseenter", () => {
      addEventListeners();
    });
    // beatElement?.addEventListener("mousemove", onMouseMove);

    beatElement?.addEventListener("mouseleave", () => {
      setPreviewData(null);
      removeEventListeners();
    });
  }, [onMouseMove, setPreviewData, selectedElement]);

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
    selectedElement,
    previewData,
  };
}
