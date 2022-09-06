import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  inputDotOnState,
  inputElementState,
  inputVoiceState,
} from "../NoteInputState";
import { Bar, NotationElement, NotePitch } from "../types";
import { getBarId, getBeatId, getNotePitchByCursorPositon } from "../utils";

interface CursorParams {
  bars: Bar[];
}
interface CursorData {
  currentBar: number;
  currentBeat: number;
  currentInputElement: NotationElement | null;
}
export function useCursor({ bars }: CursorParams): CursorData {
  const [yPosition, setYPosition] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const inputDuration = useRecoilValue(inputElementState);
  const voice = useRecoilValue(inputVoiceState);
  const dotOn = useRecoilValue(inputDotOnState);
  const [currentInputElement, setCurrentInputElement] =
    useState<NotationElement | null>(null);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setYPosition(e.clientY);
    },
    [setYPosition]
  );

  useEffect(() => {
    if (inputDuration.type === "rest") {
      setCurrentInputElement({
        type: "rest",
        duration: {
          value: inputDuration.durationValue,
          dot: dotOn,
        },
      });
    } else {
      const relativeYPosition = yPosition - offsetTop;
      const note = getNotePitchByCursorPositon({
        yPosition: relativeYPosition,
        voice,
      });
      setCurrentInputElement({
        type: "note",
        duration: {
          value: inputDuration.durationValue,
          dot: dotOn,
        },
        pitch: note,
        voice,
      });
    }
  }, [yPosition, offsetTop, voice, inputDuration, dotOn]);

  useEffect(() => {
    const barElement = document.getElementById(getBarId(currentBar));
    const { offsetTop = 0 } = barElement ?? {};
    setOffsetTop(offsetTop);
  }, [setOffsetTop, currentBar]);

  useEffect(() => {
    console.log("addEventListeners");
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
    };
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
    addEventListeners();
    return () => removeEventListeners();
  }, [onMouseMove]);

  useEffect(() => {
    if (bars?.length === 0) return;

    const beatPositions = bars[currentBar].beats.map(
      ({ beatPosition }) => beatPosition
    );
    beatPositions.forEach((beatPosition) => {
      const beatElement = document.getElementById(
        getBeatId(currentBar, beatPosition)
      );
      beatElement?.addEventListener("mouseenter", () => {
        setCurrentBeat(beatPosition);
      });
    });
  }, [currentBar, bars, setCurrentBeat]);

  useEffect(() => {
    const barNumbers = bars.map(({ barNumber }) => barNumber);
    barNumbers.forEach((barNumber) => {
      const barElement = document.getElementById(getBarId(barNumber));
      barElement?.addEventListener("mouseenter", () => {
        setCurrentBar(barNumber);
      });
    });
  }, [bars, setCurrentBar]);

  return {
    currentBar,
    currentBeat,
    currentInputElement,
  };
}
