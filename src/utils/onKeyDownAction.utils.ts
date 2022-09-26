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
import {
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onDeleteNote,
} from "./keyboardActions.utils";

interface OnKeyDownActionParams {
  currentElement: NotationElement | undefined;
  selectedBarNumber: number;
  selectedBeatPosition: number;
  bars: Bar[];
  updateElementInBars: (updatedElement: SelectedElement) => void;
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
  resetPreviewNote: () => void;
}

export const onKeyDownAction =
  ({
    bars,
    currentElement,
    selectedBarNumber,
    selectedBeatPosition,
    updateElementInBars,
    setSelectedBarNumber,
    setSelectedBeatPosition,
    resetPreviewNote,
  }: OnKeyDownActionParams) =>
  (ev: KeyboardEvent) => {
    if (ev.code === "Backspace") {
      ev.preventDefault();

      onDeleteNote({
        currentElement,
        updateElementInBars,
        selectedBarNumber,
        selectedBeatPosition,
        resetPreviewNote,
      });
    }

    if (ev.code === "ArrowUp") {
      ev.preventDefault();

      onArrowUp({
        currentElement,
        updateElementInBars,
        selectedBarNumber,
        selectedBeatPosition,
        resetPreviewNote,
      });
    }
    if (ev.code === "ArrowDown") {
      ev.preventDefault();

      onArrowDown({
        currentElement,
        updateElementInBars,
        selectedBarNumber,
        selectedBeatPosition,
        resetPreviewNote,
      });
    }
    if (ev.code === "ArrowLeft") {
      ev.preventDefault();

      onArrowLeft({
        bars,
        resetPreviewNote,
        selectedBarNumber,
        selectedBeatPosition,
        setSelectedBarNumber,
        setSelectedBeatPosition,
      });
    }
    if (ev.code === "ArrowRight") {
      ev.preventDefault();

      onArrowRight({
        bars,
        resetPreviewNote,
        selectedBarNumber,
        selectedBeatPosition,
        setSelectedBarNumber,
        setSelectedBeatPosition,
      });
    }
  };
