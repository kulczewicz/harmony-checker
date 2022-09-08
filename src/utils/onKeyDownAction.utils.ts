import { SetterOrUpdater } from "recoil";
import { Bar, SelectedElement } from "../types";
import { getNoteAbove, getNoteBelow } from "./getNoteAboveBelow.utils";

interface OnKeyDownActionParams {
  selectedElement: SelectedElement;
  bars: Bar[];
  updateBars: (updatedElement: SelectedElement) => void;
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
}

export const onKeyDownAction =
  ({
    bars,
    selectedElement: { element, barNumber, beatPosition },
    updateBars,
    setSelectedBarNumber,
    setSelectedBeatPosition,
  }: OnKeyDownActionParams) =>
  (ev: KeyboardEvent) => {
    if (ev.code === "ArrowUp") {
      ev.preventDefault();
      if (element.type === "rest") return;
      const noteAbove = getNoteAbove(element);

      if (noteAbove) {
        updateBars({
          barNumber,
          beatPosition,
          element: noteAbove,
        });
      }
    }
    if (ev.code === "ArrowDown") {
      ev.preventDefault();

      if (element.type === "rest") return;
      const noteBelow = getNoteBelow(element);

      if (noteBelow) {
        updateBars({
          barNumber,
          beatPosition,
          element: noteBelow,
        });
      }
    }
    if (ev.code === "ArrowLeft") {
      ev.preventDefault();

      if (barNumber === 0 && beatPosition === 0) return;

      if (beatPosition === 0) {
        const previousBarNumber = barNumber - 1;
        const previousBar = bars[previousBarNumber];
        const lastBeatInBar = previousBar.beats.at(-1);
        if (!lastBeatInBar) return;

        setSelectedBarNumber(previousBarNumber);
        setSelectedBeatPosition(lastBeatInBar.beatPosition);
      } else {
        const selectedBarBeats = bars[barNumber].beats;
        const currentBeatIndex = selectedBarBeats.findIndex(
          ({ beatPosition: position }) => position === beatPosition
        );
        setSelectedBeatPosition(
          selectedBarBeats[currentBeatIndex - 1].beatPosition
        );
      }
    }
    if (ev.code === "ArrowRight") {
      ev.preventDefault();

      const lastBarIndex = bars.length - 1;
      const lastBeatPositionInLastBar =
        bars[lastBarIndex].beats.at(-1)?.beatPosition;
      if (
        barNumber === lastBarIndex &&
        beatPosition === lastBeatPositionInLastBar
      )
        return;

      const lastBeatPositionInCurrentBar =
        bars[barNumber].beats.at(-1)?.beatPosition;

      if (beatPosition === lastBeatPositionInCurrentBar) {
        const nextBarNumber = barNumber + 1;
        const nextBar = bars[nextBarNumber];
        const firstBeatInBar = nextBar.beats[0];
        if (!firstBeatInBar) return;

        setSelectedBarNumber(nextBarNumber);
        setSelectedBeatPosition(firstBeatInBar.beatPosition);
      } else {
        const selectedBarBeats = bars[barNumber].beats;
        const currentBeatIndex = selectedBarBeats.findIndex(
          ({ beatPosition: position }) => position === beatPosition
        );
        setSelectedBeatPosition(
          selectedBarBeats[currentBeatIndex + 1].beatPosition
        );
      }
    }
  };
