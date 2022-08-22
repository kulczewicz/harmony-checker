import { useCallback, useEffect, useState } from "react";
import { Bar } from "../../types";
import { getBarId, getBeatId } from "./Bar/utils";

interface CursorProps {
  bars: Bar[];
  barNumber: number;
  beatPositions: number[];
}
export function Cursor({ bars }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ left: 0, top: 0 });
  const [currentBar, setCurrentBar] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      setPosition({ x: e.clientX - offset.left, y: e.clientY - offset.top });
    },
    [setPosition, offset]
  );

  useEffect(() => {
    const barElement = document.getElementById(getBarId(currentBar));
    const { offsetLeft = 0, offsetTop = 0 } = barElement ?? {};
    setOffset({ left: offsetLeft, top: offsetTop });
  }, [setOffset, currentBar]);

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
    console.log(`x:${position.x};y:${position.y}`);
  }, [position]);

  return <div id="custom_cursor" />;
}
