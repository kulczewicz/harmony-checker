import { timeSignatureWidth } from "../constants";
import {
  Bar,
  BarProcessed,
  BarWithTimeSignatureChange,
  Beat,
  BeatProcessed,
  NotationElementProcessed,
  SignatureSymbolsForNotesInKey,
} from "../types";
import { getKeyNumberAndShowAccidentalForNote } from "./calculateNoteKeyNumber.utils";
import { calculateBeatStaffPositions } from "./calculateStaffElementsPositions.utils";

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

function preprocessBeat(
  { beatPosition, soprano, alto, tenor, bass }: Beat,
  signatureSymbolsForNotesInKey: SignatureSymbolsForNotesInKey
): BeatProcessed {
  const {
    keyNumber: sopranoKeyNumber = undefined,
    showAccidental: sopranoShowAccidental = false,
  } =
    soprano?.type === "note"
      ? getKeyNumberAndShowAccidentalForNote(
          soprano.pitch,
          signatureSymbolsForNotesInKey
        )
      : {};
  const {
    keyNumber: altoKeyNumber = undefined,
    showAccidental: altoShowAccidental = false,
  } =
    alto?.type === "note"
      ? getKeyNumberAndShowAccidentalForNote(
          alto.pitch,
          signatureSymbolsForNotesInKey
        )
      : {};
  const {
    keyNumber: tenorKeyNumber = undefined,
    showAccidental: tenorShowAccidental = false,
  } =
    tenor?.type === "note"
      ? getKeyNumberAndShowAccidentalForNote(
          tenor.pitch,
          signatureSymbolsForNotesInKey
        )
      : {};
  const {
    keyNumber: bassKeyNumber = undefined,
    showAccidental: bassShowAccidental = false,
  } =
    bass?.type === "note"
      ? getKeyNumberAndShowAccidentalForNote(
          bass.pitch,
          signatureSymbolsForNotesInKey
        )
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
    topElement: alto,
    showTopAccidental: altoShowAccidental,
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
          keyNumber: sopranoKeyNumber!,
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
          keyNumber: altoKeyNumber!,
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
          keyNumber: tenorKeyNumber!,
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
          keyNumber: bassKeyNumber!,
          showAccidental: bassShowAccidental,
        }
      : undefined;

  return {
    beatPosition,
    width: Math.max(violinBeatStaffWidth, bassBeatStaffWidth),
    soprano: sopranoElement,
    alto: altoElement,
    tenor: tenorElement,
    bass: bassElement,
  };
}

export function processBar(
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
