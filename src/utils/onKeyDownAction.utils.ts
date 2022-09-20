import { Dispatch, SetStateAction } from "react";
import { SetterOrUpdater } from "recoil";
import {
  Bar,
  NotationElement,
  NoteOctave,
  NoteSymbol,
  RestElement,
  SelectedElement,
} from "../types";
import { getNoteAbove, getNoteBelow } from "./getNoteAboveBelow.utils";

interface OnKeyDownActionParams {
  currentElement: NotationElement | undefined;
  selectedBarNumber: number;
  selectedBeatPosition: number;
  bars: Bar[];
  updateBars: (updatedElement: SelectedElement) => void;
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
  setPreviewNoteSymbol: Dispatch<SetStateAction<NoteSymbol | null>>;
  setPreviewNoteOctave: Dispatch<SetStateAction<NoteOctave | null>>;
}

export const onKeyDownAction =
  ({
    bars,
    currentElement,
    selectedBarNumber,
    selectedBeatPosition,
    updateBars,
    setSelectedBarNumber,
    setSelectedBeatPosition,
    setPreviewNoteSymbol,
    setPreviewNoteOctave,
  }: OnKeyDownActionParams) =>
  (ev: KeyboardEvent) => {
    if (ev.code === "Backspace") {
      ev.preventDefault();

      if (currentElement?.type !== "note") return;

      setPreviewNoteSymbol(null);
      setPreviewNoteOctave(null);

      const newElement: RestElement = {
        type: "rest",
        duration: currentElement.duration,
        voice: currentElement.voice,
      };
      updateBars({
        barNumber: selectedBarNumber,
        beatPosition: selectedBeatPosition,
        element: newElement,
      });
    }

    if (ev.code === "ArrowUp") {
      ev.preventDefault();
      if (currentElement?.type !== "note") return;

      const noteAbove = getNoteAbove(currentElement);

      if (noteAbove) {
        setPreviewNoteSymbol(null);
        setPreviewNoteOctave(null);
        updateBars({
          barNumber: selectedBarNumber,
          beatPosition: selectedBeatPosition,
          element: noteAbove,
        });
      }
    }
    if (ev.code === "ArrowDown") {
      ev.preventDefault();

      if (currentElement?.type !== "note") return;
      const noteBelow = getNoteBelow(currentElement);

      if (noteBelow) {
        setPreviewNoteSymbol(null);
        setPreviewNoteOctave(null);
        updateBars({
          barNumber: selectedBarNumber,
          beatPosition: selectedBeatPosition,
          element: noteBelow,
        });
      }
    }
    if (ev.code === "ArrowLeft") {
      ev.preventDefault();

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
      setPreviewNoteSymbol(null);
    }
    if (ev.code === "ArrowRight") {
      ev.preventDefault();

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
      setPreviewNoteSymbol(null);
      setPreviewNoteOctave(null);
    }
  };
