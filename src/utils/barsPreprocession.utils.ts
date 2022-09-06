import { restWidths } from "../components/Notation/Rests";
import {
  noteHeadWidth,
  noteOffset,
  notePadding,
  noteTailWidth,
  timeSignatureWidth,
} from "../constants";
import {
  Bar,
  BarProcessed,
  BarWithTimeSignatureChange,
  Beat,
  BeatProcessed,
  DurationValue,
  NotationElement,
  StaffElements,
} from "../types";
import { calculateStaffElementsHorizontalPositions } from "./calculateStaffElementsPositions.utils";

export function processTimeSignatureChanges(
  bars: Bar[]
): BarWithTimeSignatureChange[] {
  return bars.map(({ timeSignature, ...bar }, index, bars) => {
    const previousElement = bars[index - 1];
    if (
      !previousElement ||
      previousElement.timeSignature.topNumber !== timeSignature.topNumber ||
      previousElement.timeSignature.bottomNumber !== timeSignature.bottomNumber
    ) {
      return { ...bar, timeSignature, timeSignatureChange: true };
    }
    return { ...bar, timeSignature, timeSignatureChange: false };
  });
}

function calculateElementWidthWithRightPadding(element: NotationElement) {
  if (element.type === "rest") {
    return restWidths[element.duration.value] + notePadding;
  }
  if (
    (["eights", "sixteenth", "thirtySecond"] as DurationValue[]).includes(
      element.duration.value
    )
  ) {
    return noteTailWidth + noteOffset;
  }
  return noteHeadWidth + notePadding;
}

function calculateBeatStaffWidth(params: StaffElements) {
  const { topElement, bottomElement } = params;
  const topElementWidthWithRightPadding = topElement
    ? calculateElementWidthWithRightPadding(topElement)
    : 0;
  const bottomElementWidthWithRightPadding = bottomElement
    ? calculateElementWidthWithRightPadding(bottomElement)
    : 0;

  const { topElementLeftOffset, bottomElementLeftOffset } =
    calculateStaffElementsHorizontalPositions(params);

  const topElementWidth =
    topElementLeftOffset + topElementWidthWithRightPadding;
  const bottomElementWidth =
    bottomElementLeftOffset + bottomElementWidthWithRightPadding;

  return {
    topElementLeftOffset,
    bottomElementLeftOffset,
    maxWidth: Math.max(topElementWidth, bottomElementWidth),
  };
}

function preprocessBeat({
  beatPosition,
  soprano,
  alto,
  tenor,
  bass,
}: Beat): BeatProcessed {
  const {
    topElementLeftOffset: sopranoLeftOffset,
    bottomElementLeftOffset: altoLeftOffset,
    maxWidth: violinBeatStaffMaxWidth,
  } = calculateBeatStaffWidth({
    topElement: soprano,
    bottomElement: alto,
  });
  const {
    topElementLeftOffset: tenorLeftOffset,
    bottomElementLeftOffset: bassLeftOffset,
    maxWidth: bassBeatStaffMaxWidth,
  } = calculateBeatStaffWidth({
    topElement: tenor,
    bottomElement: bass,
  });

  return {
    beatPosition,
    width: Math.max(violinBeatStaffMaxWidth, bassBeatStaffMaxWidth),
    ...(soprano
      ? { soprano: { ...soprano, leftOffset: sopranoLeftOffset } }
      : {}),
    ...(alto ? { alto: { ...alto, leftOffset: altoLeftOffset } } : {}),
    ...(tenor ? { tenor: { ...tenor, leftOffset: tenorLeftOffset } } : {}),
    ...(bass ? { bass: { ...bass, leftOffset: bassLeftOffset } } : {}),
  };
}

export function processBar({
  barNumber,
  beats,
  timeSignature,
  timeSignatureChange,
}: BarWithTimeSignatureChange): BarProcessed {
  let barWidth = 0;
  if (timeSignatureChange) {
    barWidth += timeSignatureWidth;
  }

  const processedBeats: BeatProcessed[] = [];
  for (const beat of beats) {
    const processedBeat = preprocessBeat(beat);
    processedBeats.push(processedBeat);
    barWidth += processedBeat.width;
  }

  return {
    barNumber,
    timeSignature,
    timeSignatureChange,
    beats: processedBeats,
    width: barWidth,
  };
}
