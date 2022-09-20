import { timeSignatureWidth } from "../constants";
import {
  Bar,
  BarProcessed,
  BarWithTimeSignatureChange,
  Beat,
  BeatProcessed,
  BeatProcessedWithBarNumber,
  NotationElementProcessed,
  SignatureSymbolsForNotesInKey,
} from "../types";
import { getSignatureForNote } from "./calculateNoteKeyNumber.utils";
import { calculateBeatStaffPositions } from "./calculateStaffElementsPositions.utils";
import { checkBeat } from "./checker";
import { checkTwoConsecutiveBeats } from "./checker/horizontalChecker.utils";

export function preprocessTimeSignatureChanges(
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

function preprocessBeat(
  { beatPosition, soprano, alto, tenor, bass }: Beat,
  signatureSymbolsForNotesInKey: SignatureSymbolsForNotesInKey
): BeatProcessed {
  const {
    absoluteSignature: sopranoAbsoluteSignature = undefined,
    showAccidental: sopranoShowAccidental = false,
  } =
    soprano?.type === "note"
      ? getSignatureForNote(soprano.pitch, signatureSymbolsForNotesInKey)
      : {};
  const {
    absoluteSignature: altoAbsoluteSignature = undefined,
    showAccidental: altoShowAccidental = false,
  } =
    alto?.type === "note"
      ? getSignatureForNote(alto.pitch, signatureSymbolsForNotesInKey)
      : {};
  const {
    absoluteSignature: tenorAbsoluteSignature = undefined,
    showAccidental: tenorShowAccidental = false,
  } =
    tenor?.type === "note"
      ? getSignatureForNote(tenor.pitch, signatureSymbolsForNotesInKey)
      : {};
  const {
    absoluteSignature: bassAbsoluteSignature = undefined,
    showAccidental: bassShowAccidental = false,
  } =
    bass?.type === "note"
      ? getSignatureForNote(bass.pitch, signatureSymbolsForNotesInKey)
      : {};

  const {
    topElementLeftOffset: sopranoLeftOffset,
    topAccidentalLeftOffset: sopranoAccidentalLeftOffset,
    bottomElementLeftOffset: altoLeftOffset,
    bottomAccidentalLeftOffset: altoAccidentalLeftOffset,
    beatStaffWidth: violinBeatStaffWidth,
  } = calculateBeatStaffPositions({
    topElement: soprano,
    showTopAccidental: sopranoShowAccidental,
    bottomElement: alto,
    showBottomAccidental: altoShowAccidental,
  });
  const {
    topElementLeftOffset: tenorLeftOffset,
    topAccidentalLeftOffset: tenorAccidentalLeftOffset,
    bottomElementLeftOffset: bassLeftOffset,
    bottomAccidentalLeftOffset: bassAccidentalLeftOffset,
    beatStaffWidth: bassBeatStaffWidth,
  } = calculateBeatStaffPositions({
    topElement: tenor,
    showTopAccidental: tenorShowAccidental,
    bottomElement: bass,
    showBottomAccidental: bassShowAccidental,
  });

  const sopranoElement: NotationElementProcessed | undefined =
    soprano?.type === "rest"
      ? { ...soprano, leftOffset: sopranoLeftOffset }
      : soprano?.type === "note"
      ? {
          ...soprano,
          leftOffset: sopranoLeftOffset,
          accidentalLeftOffset: sopranoAccidentalLeftOffset,
          absoluteSignature: sopranoAbsoluteSignature!,
          showAccidental: sopranoShowAccidental,
        }
      : undefined;

  const altoElement: NotationElementProcessed | undefined =
    alto?.type === "rest"
      ? { ...alto, leftOffset: altoLeftOffset }
      : alto?.type === "note"
      ? {
          ...alto,
          leftOffset: altoLeftOffset,
          accidentalLeftOffset: altoAccidentalLeftOffset,
          absoluteSignature: altoAbsoluteSignature!,
          showAccidental: altoShowAccidental,
        }
      : undefined;

  const tenorElement: NotationElementProcessed | undefined =
    tenor?.type === "rest"
      ? { ...tenor, leftOffset: tenorLeftOffset }
      : tenor?.type === "note"
      ? {
          ...tenor,
          leftOffset: tenorLeftOffset,
          accidentalLeftOffset: tenorAccidentalLeftOffset,
          absoluteSignature: tenorAbsoluteSignature!,
          showAccidental: tenorShowAccidental,
        }
      : undefined;

  const bassElement: NotationElementProcessed | undefined =
    bass?.type === "rest"
      ? { ...bass, leftOffset: bassLeftOffset }
      : bass?.type === "note"
      ? {
          ...bass,
          leftOffset: bassLeftOffset,
          accidentalLeftOffset: bassAccidentalLeftOffset,
          absoluteSignature: bassAbsoluteSignature!,
          showAccidental: bassShowAccidental,
        }
      : undefined;

  return {
    beatPosition,
    width: Math.max(violinBeatStaffWidth, bassBeatStaffWidth),
    errors: [],
    soprano: sopranoElement,
    alto: altoElement,
    tenor: tenorElement,
    bass: bassElement,
  };
}

export function preprocessBar(
  {
    barNumber,
    beats,
    timeSignature,
    timeSignatureChange,
  }: BarWithTimeSignatureChange,
  signatureSymbolsForNotesInKey: SignatureSymbolsForNotesInKey
): BarProcessed {
  let barWidth = 0;
  if (timeSignatureChange) {
    barWidth += timeSignatureWidth;
  }

  const processedBeats: BeatProcessed[] = [];
  for (const beat of beats) {
    const processedBeat = preprocessBeat(beat, signatureSymbolsForNotesInKey);
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

function mutateProcessBarsByAddingErrors(processedBars: BarProcessed[]) {
  const allBeats = processedBars.reduce((acc, curr) => {
    const currentBeatsWithBarNumber = curr.beats.map((beat) => ({
      ...beat,
      barNumber: curr.barNumber,
    }));
    acc.push(...currentBeatsWithBarNumber);
    return acc;
  }, [] as BeatProcessedWithBarNumber[]);

  for (let beatIndex = 0; beatIndex < allBeats.length; beatIndex++) {
    const currentBeat = allBeats[beatIndex];
    const nextBeat = allBeats[beatIndex + 1];
    if (currentBeat) {
      const beatErrors = checkBeat(currentBeat);
      beatErrors.forEach(
        ({ barNumber, beatPosition, type, topVoice, bottomVoice }) => {
          const beatIndex = processedBars[barNumber].beats.findIndex(
            (beat) => beat.beatPosition === beatPosition
          );
          if (beatIndex < -1) {
            return;
          }

          processedBars[barNumber].beats[beatIndex].errors.push({
            type,
            topVoice,
            bottomVoice,
          });
        }
      );

      if (nextBeat) {
        const consecutiveBeatsErrors = checkTwoConsecutiveBeats(
          currentBeat,
          nextBeat
        );
        consecutiveBeatsErrors.forEach(
          ({
            type,
            topVoice,
            bottomVoice,
            firstBarNumber,
            firstBeatPosition,
            secondBarNumber,
            secondBeatPosition,
          }) => {
            const firstBeatIndex = processedBars[
              firstBarNumber
            ].beats.findIndex(
              ({ beatPosition }) => beatPosition === firstBeatPosition
            );

            const secondBeatIndex = processedBars[
              secondBarNumber
            ].beats.findIndex(
              ({ beatPosition }) => beatPosition === secondBeatPosition
            );

            if (firstBeatIndex < -1 || secondBeatIndex < -1) {
              return;
            }

            processedBars[firstBarNumber].beats[firstBeatIndex].errors.push({
              type,
              topVoice,
              bottomVoice,
            });
            processedBars[secondBarNumber].beats[secondBeatIndex].errors.push({
              type,
              topVoice,
              bottomVoice,
            });
          }
        );
      }
    }
  }
}

export function preprocessBars(
  bars: Bar[],
  signatureSymbolsForNotesInKey: SignatureSymbolsForNotesInKey
) {
  const barsWithTimeSignatureChanges = preprocessTimeSignatureChanges(bars);
  const processedBars = barsWithTimeSignatureChanges.map((bar) =>
    preprocessBar(bar, signatureSymbolsForNotesInKey)
  );

  mutateProcessBarsByAddingErrors(processedBars);

  return { processedBars };
}
