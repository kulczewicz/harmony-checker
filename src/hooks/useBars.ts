import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { durationByNoteValue } from "../constants/timeSignature.constants";
import { barsState, defaultBarsState } from "../NoteInputState";
import { Bar, Beat, SelectedElement } from "../types";
import {
  calculateBarDuration,
  getMissingBeats,
  getValidDurationsForDurationNumber,
} from "../utils/timeSignature.utils";

export function getUpdatedBar(
  bar: Bar,
  { beatPosition: newBeatPosition, element: newElement }: SelectedElement
) {
  const { beats, barNumber, timeSignature } = bar;
  const barDuration = calculateBarDuration(timeSignature);
  const elementBeatIndex = beats.findIndex(
    ({ beatPosition }) => newBeatPosition === beatPosition
  );
  const elementBeat = beats[elementBeatIndex];
  if (!elementBeat) return bar;

  const oldElement = elementBeat[newElement.voice];
  if (!oldElement) return bar;

  const newDuration = durationByNoteValue[newElement.duration.value];
  const oldDuration = durationByNoteValue[oldElement.duration.value];

  if (newDuration === oldDuration) {
    const newBeats = beats.map((beat) => {
      if (beat.beatPosition !== newBeatPosition) return beat;

      return {
        ...beat,
        [newElement.voice]: newElement,
      };
    });
    return { barNumber, timeSignature, beats: newBeats };
  }

  const beatPositionOfNewElementEnd = elementBeat.beatPosition + newDuration;
  if (newDuration > oldDuration && beatPositionOfNewElementEnd > barDuration) {
    // new element is longer than the bar itself -> disable replacement
    return bar;
  }

  if (newDuration > oldDuration) {
    let nextBeatAfterNewElementIndex = beats.findIndex(
      ({ beatPosition }) => beatPosition >= beatPositionOfNewElementEnd
    );
    if (nextBeatAfterNewElementIndex < 0) {
      nextBeatAfterNewElementIndex = barDuration;
    }
    const beatsBeforeOldBeat = beats.slice(0, elementBeatIndex);
    const beatsToReplace = beats
      .slice(elementBeatIndex, nextBeatAfterNewElementIndex)
      .map(({ ...beat }) => {
        if (beat.beatPosition !== newBeatPosition) {
          delete beat[newElement.voice];
          return beat;
        }
        return {
          ...beat,
          [newElement.voice]: newElement,
        };
      })
      .filter((beat) => beat.soprano || beat.alto || beat.tenor || beat.bass);
    const beatsAfter = beats.slice(nextBeatAfterNewElementIndex);

    const nextBeatAfterNewElement = beats[nextBeatAfterNewElementIndex];

    let missingBeats: Beat[] = [];
    if (nextBeatAfterNewElement?.beatPosition > beatPositionOfNewElementEnd) {
      const missingDuration =
        nextBeatAfterNewElement.beatPosition - beatPositionOfNewElementEnd;
      missingBeats = getMissingBeats({
        missingBeatsDurations:
          getValidDurationsForDurationNumber(missingDuration),
        startBeatPosition: beatPositionOfNewElementEnd,
        voice: newElement.voice,
      });
    }
    const newBeats = [
      ...beatsBeforeOldBeat,
      ...beatsToReplace,
      ...missingBeats,
      ...beatsAfter,
    ];

    return {
      barNumber,
      timeSignature,
      beats: newBeats,
    };
  }
  if (newDuration < oldDuration) {
    const beatsBeforeOldBeat = beats.slice(0, elementBeatIndex);
    const missingDuration = oldDuration - newDuration;
    const updatedBeat = {
      ...elementBeat,
      [newElement.voice]: newElement,
    };
    const missingBeats = getMissingBeats({
      missingBeatsDurations:
        getValidDurationsForDurationNumber(missingDuration),
      startBeatPosition: beatPositionOfNewElementEnd,
      voice: newElement.voice,
    });
    const beatsAfter = beats.slice(elementBeatIndex + 1);
    const beatsMerged = missingBeats.reduce((acc: Beat[], curr) => {
      const existingBeatOnSameBeatPosition = beatsAfter.find(
        ({ beatPosition }) => beatPosition === curr.beatPosition
      );
      if (existingBeatOnSameBeatPosition) {
        acc.push({
          ...existingBeatOnSameBeatPosition,
          ...curr,
        });
        return acc;
      }
      acc.push(curr);
      return acc;
    }, []);
    const beatsAfterWithoutMerged = beatsAfter.filter(
      ({ beatPosition: beatAfterPosition }) =>
        !beatsMerged.find(
          ({ beatPosition: mergedBeatPosition }) =>
            mergedBeatPosition === beatAfterPosition
        )
    );
    return {
      barNumber,
      timeSignature,
      beats: [
        ...beatsBeforeOldBeat,
        updatedBeat,
        ...beatsMerged,
        ...beatsAfterWithoutMerged,
      ].sort((a, b) => a.beatPosition - b.beatPosition),
    };
  }
  return bar;
}

function getBarsWithUpdatedElement(newElement: SelectedElement, bars: Bar[]) {
  return bars.map((bar) => {
    if (bar.barNumber !== newElement.barNumber) return bar;

    return getUpdatedBar(bar, newElement);
  });
}

export function useBars() {
  const [bars, setBars] = useRecoilState(barsState);

  const updateBarsWithCache = (bars: Bar[]) => {
    setBars(bars);
    localStorage.setItem("bars", JSON.stringify(bars));
  };

  const resetBars = () => {
    setBars([...defaultBarsState]);
    localStorage.removeItem("bars");
  };

  const updateElementInBars = useCallback(
    (newElement: SelectedElement) => {
      const newBars = getBarsWithUpdatedElement(newElement, bars);
      setBars(newBars);
      localStorage.setItem("bars", JSON.stringify(newBars));
    },
    [bars, setBars]
  );

  const loadBarsFromLocalStorage = () => {
    const barsFromLocalStorage = localStorage.getItem("bars");
    if (!barsFromLocalStorage) return;
    let bars: Bar[] = [];
    try {
      bars = JSON.parse(barsFromLocalStorage);
    } catch {
      return;
    }
    setBars(bars);
  };

  return {
    bars,
    resetBars,
    loadBarsFromLocalStorage,
    updateBarsWithCache,
    updateElementInBars,
  };
}
