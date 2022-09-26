import { SetterOrUpdater } from "recoil";
import { Bar, NotationElement, RestElement, SelectedElement } from "../types";
import { getNoteAbove, getNoteBelow } from "./getNoteAboveBelow.utils";

interface OnDeleteNoteParams {
  currentElement: NotationElement | undefined;
  resetPreviewNote: () => void;
  updateElementInBars: (updatedElement: SelectedElement) => void;
  selectedBarNumber: number;
  selectedBeatPosition: number;
}
export function onDeleteNote({
  currentElement,
  resetPreviewNote,
  updateElementInBars,
  selectedBarNumber,
  selectedBeatPosition,
}: OnDeleteNoteParams) {
  if (currentElement?.type !== "note") return;

  resetPreviewNote();

  const newElement: RestElement = {
    type: "rest",
    duration: currentElement.duration,
    voice: currentElement.voice,
  };
  updateElementInBars({
    barNumber: selectedBarNumber,
    beatPosition: selectedBeatPosition,
    element: newElement,
  });
}

interface OnArrowUpDownParams {
  currentElement: NotationElement | undefined;
  resetPreviewNote: () => void;
  updateElementInBars: (updatedElement: SelectedElement) => void;
  selectedBarNumber: number;
  selectedBeatPosition: number;
}

export function onArrowUp({
  currentElement,
  resetPreviewNote,
  updateElementInBars,
  selectedBarNumber,
  selectedBeatPosition,
}: OnArrowUpDownParams) {
  if (currentElement?.type !== "note") return;

  const noteAbove = getNoteAbove(currentElement);

  if (noteAbove) {
    resetPreviewNote();
    updateElementInBars({
      barNumber: selectedBarNumber,
      beatPosition: selectedBeatPosition,
      element: noteAbove,
    });
  }
}

export function onArrowDown({
  currentElement,
  resetPreviewNote,
  updateElementInBars,
  selectedBarNumber,
  selectedBeatPosition,
}: OnArrowUpDownParams) {
  if (currentElement?.type !== "note") return;
  const noteBelow = getNoteBelow(currentElement);

  if (noteBelow) {
    resetPreviewNote();
    updateElementInBars({
      barNumber: selectedBarNumber,
      beatPosition: selectedBeatPosition,
      element: noteBelow,
    });
  }
}

interface OnArrowLeftRightParams {
  selectedBarNumber: number;
  selectedBeatPosition: number;
  bars: Bar[];
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
  resetPreviewNote: () => void;
}

export function onArrowLeft({
  bars,
  setSelectedBarNumber,
  setSelectedBeatPosition,
  selectedBarNumber,
  selectedBeatPosition,
  resetPreviewNote,
}: OnArrowLeftRightParams) {
  if (selectedBarNumber === 0 && selectedBeatPosition === 0) return;

  if (selectedBeatPosition === 0) {
    const previousBarNumber = selectedBarNumber - 1;
    const previousBar = bars[previousBarNumber];
    const lastBeatInBar = previousBar.beats.at(-1);
    if (!lastBeatInBar) return;

    setSelectedBarNumber(previousBarNumber);
    setSelectedBeatPosition(lastBeatInBar.beatPosition);
  } else {
    const selectedBarBeats = bars[selectedBarNumber].beats;
    const currentBeatIndex = selectedBarBeats.findIndex(
      ({ beatPosition: position }) => position === selectedBeatPosition
    );
    setSelectedBeatPosition(
      selectedBarBeats[currentBeatIndex - 1].beatPosition
    );
  }
  resetPreviewNote();
}

export function onArrowRight({
  bars,
  setSelectedBarNumber,
  setSelectedBeatPosition,
  selectedBarNumber,
  selectedBeatPosition,
  resetPreviewNote,
}: OnArrowLeftRightParams) {
  const lastBarIndex = bars.length - 1;
  const lastBeatPositionInLastBar =
    bars[lastBarIndex].beats.at(-1)?.beatPosition;
  if (
    selectedBarNumber === lastBarIndex &&
    selectedBeatPosition === lastBeatPositionInLastBar
  )
    return;

  const lastBeatPositionInCurrentBar =
    bars[selectedBarNumber].beats.at(-1)?.beatPosition;

  if (selectedBeatPosition === lastBeatPositionInCurrentBar) {
    const nextBarNumber = selectedBarNumber + 1;
    const nextBar = bars[nextBarNumber];
    const firstBeatInBar = nextBar.beats[0];
    if (!firstBeatInBar) return;

    setSelectedBarNumber(nextBarNumber);
    setSelectedBeatPosition(firstBeatInBar.beatPosition);
  } else {
    const selectedBarBeats = bars[selectedBarNumber].beats;
    const currentBeatIndex = selectedBarBeats.findIndex(
      ({ beatPosition: position }) => position === selectedBeatPosition
    );
    setSelectedBeatPosition(
      selectedBarBeats[currentBeatIndex + 1].beatPosition
    );
  }
  resetPreviewNote();
}
