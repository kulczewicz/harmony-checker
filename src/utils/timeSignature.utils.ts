import { widthIncreaseFactorByNoteValue } from "../constants";
import {
  durationByNoteValue,
  durationOfTimeSignatureBottom,
  noteValueByDuration,
} from "../constants/timeSignature.constants";
import { Beat, TimeSignature, Voice } from "../types";

export function calculateBarDuration({
  topNumber,
  bottomNumber,
}: TimeSignature) {
  return topNumber * durationOfTimeSignatureBottom[bottomNumber];
}

const durations = [32, 16, 8, 4, 2, 1];

export function getValidDurationsForDurationNumber(
  durationNumber: number
): number[] {
  let biggerDuration = Number.MAX_VALUE;
  let smallerDuration = durations[0];

  if (durationNumber >= smallerDuration) {
    return [
      ...getValidDurationsForDurationNumber(durationNumber - smallerDuration),
      smallerDuration,
    ];
  }

  for (let dur = 1; dur < durations.length; dur++) {
    biggerDuration = smallerDuration;
    smallerDuration = durations[dur];
    if (durationNumber < biggerDuration && durationNumber >= smallerDuration) {
      return [
        ...getValidDurationsForDurationNumber(durationNumber - smallerDuration),
        smallerDuration,
      ];
    }
  }
  return [];
}

interface GetMissingBeatsParams {
  missingBeatsDurations: number[];
  startBeatPosition: number;
  voice: Voice;
}
export function getMissingBeats({
  missingBeatsDurations,
  startBeatPosition,
  voice,
}: GetMissingBeatsParams) {
  const beats: Beat[] = [];
  let beatPositionOffset = startBeatPosition;
  for (const duration of missingBeatsDurations) {
    beats.push({
      beatPosition: beatPositionOffset,
      [voice]: {
        duration: { value: noteValueByDuration[duration] },
        type: "rest",
        voice,
      },
    });
    beatPositionOffset += duration;
  }
  return beats;
}

export function getShortestDurationInBeat({
  soprano,
  alto,
  tenor,
  bass,
}: Beat) {
  const shortestDuration = [soprano, alto, tenor, bass]
    .filter(Boolean)
    .reduce((acc, curr) => {
      const currentDuration = durationByNoteValue[curr!.duration.value];
      if (currentDuration < acc) return currentDuration;
      return acc;
    }, Number.MAX_VALUE);
  return noteValueByDuration[shortestDuration];
}

export const getWidthIncreaseFactorForBeat = (beat: Beat) =>
  widthIncreaseFactorByNoteValue[getShortestDurationInBeat(beat)];
