import { useCallback, useEffect, useState } from "react";
import { Bar } from "../../types";
import { getBarId, getBeatId, getNoteByCursorPositon } from "../../utils";

interface CursorProps {
  bars: Bar[];
  barNumber: number;
  beatPositions: number[];
}
export function Cursor({ bars }: CursorProps) {
  const [yPosition, setYPosition] = useState(0);
  const [offsetTop, setOffsetTop] = useState(0);
  const [currentBar, setCurrentBar] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setYPosition(e.clientY - offsetTop);
    },
    [setYPosition, offsetTop]
  );

  useEffect(() => {
    const barElement = document.getElementById(getBarId(currentBar));
    const { offsetTop = 0 } = barElement ?? {};
    setOffsetTop(offsetTop);
  }, [setOffsetTop, currentBar]);

  useEffect(() => {
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
    console.log(`setEventListenerForBars`);
    barNumbers.forEach((barNumber) => {
      const barElement = document.getElementById(getBarId(barNumber));
      barElement?.addEventListener("mouseenter", () => {
        setCurrentBar(barNumber);
      });
    });
  }, [bars, setCurrentBar]);

  useEffect(() => {
    console.log(`currentBar:${currentBar}`);
  }, [currentBar]);

  useEffect(() => {
    console.log(`currentBeat:${currentBeat}`);
  }, [currentBeat]);

  useEffect(() => {
    const note = getNoteByCursorPositon({ yPosition, voice: "soprano" });
    console.log(`${note.noteSymbol}:${note.octave}`);
    console.log(`y:${yPosition}`);
  }, [yPosition]);

  return <div id="custom_cursor" />;
}
