import { Bar, SelectedElement, Voice } from "../types";

interface GetSelectedElement {
  bars: Bar[];
  selectedBarNumber: number;
  selectedBeatPosition: number;
  voice: Voice;
}
export function getSelectedElement({
  bars,
  selectedBarNumber,
  selectedBeatPosition,
  voice,
}: GetSelectedElement): SelectedElement | null {
  if (selectedBarNumber === null || selectedBeatPosition === null) return null;

  const currentBar = bars[selectedBarNumber];
  const currentBarBeats = currentBar.beats || [];

  const currentBeat = currentBarBeats.find(
    ({ beatPosition }) => beatPosition === selectedBeatPosition
  );
  if (!currentBeat) return null;

  const element = currentBeat[voice];
  if (!element) return null;

  return {
    barNumber: selectedBarNumber,
    beatPosition: selectedBeatPosition,
    element,
  };
}
