import { restWidths } from "../components/Notation/Rests";
import {
  noteHeadWidth,
  noteOffset,
  notePadding,
  noteTailWidth,
  timeSignatureWidth,
  widthIncreaseFactorByNoteValue,
} from "../constants";
import {
  Bar,
  BarProcessed,
  BarWithTimeSignatureChange,
  Beat,
  BeatProcessed,
  NoteValue,
  NotationElement,
  SignatureSymbolsForNotesInKey,
} from "../types";
import { getKeyNumberAndShowAccidentalForNote } from "./calculateNoteKeyNumber.utils";
import {
  CalculateHorizontalPositionsParams,
  calculateStaffElementsHorizontalPositions,
} from "./calculateStaffElementsPositions.utils";
import { getWidthIncreaseFactorForBeat } from "./timeSignature.utils";

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
    (["eights", "sixteenth", "thirtySecond"] as NoteValue[]).includes(
      element.duration.value
    )
  ) {
    return noteTailWidth + noteOffset;
  }
  return noteHeadWidth + notePadding;
}

function calculateBeatStaffWidth(params: CalculateHorizontalPositionsParams) {
  const { topElement, bottomElement } = params;
  const topElementWidthWithRightPadding = topElement.element
    ? calculateElementWidthWithRightPadding(topElement.element)
    : 0;
  const bottomElementWidthWithRightPadding = bottomElement.element
    ? calculateElementWidthWithRightPadding(bottomElement.element)
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
    bottomElementLeftOffset: altoLeftOffset,
    maxWidth: violinBeatStaffMaxWidth,
  } = calculateBeatStaffWidth({
    topElement: {
      element: soprano,
      showAccidental: sopranoShowAccidental,
    },
    bottomElement: {
      element: alto,
      showAccidental: altoShowAccidental,
    },
  });
  const {
    topElementLeftOffset: tenorLeftOffset,
    bottomElementLeftOffset: bassLeftOffset,
    maxWidth: bassBeatStaffMaxWidth,
  } = calculateBeatStaffWidth({
    topElement: {
      element: tenor,
      showAccidental: tenorShowAccidental,
    },
    bottomElement: {
      element: bass,
      showAccidental: bassShowAccidental,
    },
  });

  const sopranoElement =
    soprano?.type === "rest"
      ? { ...soprano, leftOffset: sopranoLeftOffset }
      : soprano?.type === "note"
      ? {
          ...soprano,
          leftOffset: sopranoLeftOffset,
          keyNumber: sopranoKeyNumber!,
          showAccidental: sopranoShowAccidental,
        }
      : undefined;

  const altoElement =
    alto?.type === "rest"
      ? { ...alto, leftOffset: altoLeftOffset }
      : alto?.type === "note"
      ? {
          ...alto,
          leftOffset: altoLeftOffset,
          keyNumber: altoKeyNumber!,
          showAccidental: altoShowAccidental,
        }
      : undefined;

  const tenorElement =
    tenor?.type === "rest"
      ? { ...tenor, leftOffset: tenorLeftOffset }
      : tenor?.type === "note"
      ? {
          ...tenor,
          leftOffset: tenorLeftOffset,
          keyNumber: tenorKeyNumber!,
          showAccidental: tenorShowAccidental,
        }
      : undefined;

  const bassElement =
    bass?.type === "rest"
      ? { ...bass, leftOffset: bassLeftOffset }
      : bass?.type === "note"
      ? {
          ...bass,
          leftOffset: bassLeftOffset,
          keyNumber: bassKeyNumber!,
          showAccidental: bassShowAccidental,
        }
      : undefined;

  return {
    beatPosition,
    width: Math.max(violinBeatStaffMaxWidth, bassBeatStaffMaxWidth),
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
