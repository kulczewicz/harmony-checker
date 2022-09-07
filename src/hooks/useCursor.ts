import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputDotOnState,
  inputElementState,
  inputVoiceState,
  selectedElementState,
} from "../NoteInputState";
import { Bar, NoteElement } from "../types";
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

export function useCursor({ bars }: CursorParams) {
  const [yPosition, setYPosition] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [previewBarNumber, setPreviewBarNumber] = useState<number>(0);
  const [previewBeatPosition, setPreviewBeatPosition] = useState<number>(0);
  const [previewElement, setPreviewElement] = useState<NoteElement | null>(
    null
  );
  const [previewData, setPreviewData] = useState<PreviewElement | null>(null);
  const [inputDuration, setInputDuration] = useRecoilState(inputElementState);
  const [voice, setVoice] = useRecoilState(inputVoiceState);
  const [dotOn, setDotOn] = useRecoilState(inputDotOnState);
  const [selectedElement, setSelectedElement] =
    useRecoilState(selectedElementState);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setYPosition(e.clientY);
    },
    [setYPosition]
  );

  useEffect(() => {
    if (!previewElement) {
      setPreviewData(null);
      return;
    }
    setPreviewData({
      barNumber: previewBarNumber,
      data: {
        beatPosition: previewBeatPosition,
        element: previewElement,
      },
    });
  }, [previewElement, previewBeatPosition, previewBarNumber, setPreviewData]);

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
    setVoice(voice), setInputDuration({ type, durationValue });
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
    const relativeYPosition = yPosition - offsetTop;
    const note = getNotePitchByCursorPositon({
      yPosition: relativeYPosition,
      voice,
    });
    setPreviewElement({
      type: "note",
      duration: {
        value: inputDuration.durationValue,
        dot: dotOn,
      },
      pitch: note,
      voice,
    });
  }, [yPosition, offsetTop, voice, inputDuration, dotOn]);

  useEffect(() => {
    if (!selectedElement) return;

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
    };
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
    const { barNumber, beatPosition } = selectedElement;

    const barElement = document.getElementById(getBarId(barNumber));
    const { offsetTop = 0 } = barElement ?? {};
    setOffsetTop(offsetTop);

    const beatElement = document.getElementById(
      getBeatId(barNumber, beatPosition)
    );

    beatElement?.addEventListener("mouseenter", () => {
      addEventListeners();
    });

    beatElement?.addEventListener("mouseleave", () => {
      setPreviewElement(null);
      removeEventListeners();
    });

    // return removeEventListeners;
  }, [onMouseMove, setPreviewElement, selectedElement]);

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
