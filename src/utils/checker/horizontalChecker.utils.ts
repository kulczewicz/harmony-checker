import {
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  HorizontalHarmonyError,
  Voice,
} from "../../types";
import { calculateTwoNoteSymbolsDistance } from "../calculateStaffElementsPositions.utils";

const FIFTH_NOTES_DISTANCE = 4;
const OCTAVE_NOTES_DISTANCE = 6;
const TWELFTH_NOTES_DISTANCE = 11;

type ParallelVulnerableInterval = "octave" | "fifth" | "twelfth";
function checkParallelVulnerableInterval(
  {
    pitch: topPitch,
    absoluteSignature: topAbsoluteSignature,
  }: NoteElementProcessed,
  {
    pitch: bottomPitch,
    absoluteSignature: bottomAbsoluteSignature,
  }: NoteElementProcessed
): ParallelVulnerableInterval | null {
  const distance = calculateTwoNoteSymbolsDistance(topPitch, bottomPitch);
  if (
    distance === OCTAVE_NOTES_DISTANCE &&
    topAbsoluteSignature === bottomAbsoluteSignature
  ) {
    return "octave";
  }

  if (distance !== FIFTH_NOTES_DISTANCE && distance !== TWELFTH_NOTES_DISTANCE)
    return null;

  const fifthOrTwelfthBasedOnB =
    (bottomPitch.noteSymbol === "B" &&
      bottomAbsoluteSignature === "flat" &&
      topAbsoluteSignature === null) ||
    (bottomAbsoluteSignature === null && topAbsoluteSignature === "sharp");

  if (
    fifthOrTwelfthBasedOnB ||
    topAbsoluteSignature === bottomAbsoluteSignature
  ) {
    return distance === FIFTH_NOTES_DISTANCE ? "fifth" : "twelfth";
  }
  return null;
}

interface CheckNotesErrorsParams {
  barNumber: number;
  beatPosition: number;
  soprano: NoteElementProcessed;
  alto: NoteElementProcessed;
  tenor: NoteElementProcessed;
  bass: NoteElementProcessed;
}
interface VoicesDistances {
  distance: number;
  signaturesSame: boolean;
}
function getAllVoicesParallelIntervals({
  soprano,
  alto,
  tenor,
  bass,
}: Pick<CheckNotesErrorsParams, "soprano" | "alto" | "tenor" | "bass">) {
  return {
    sopranoAlto: checkParallelVulnerableInterval(soprano, alto),
    sopranoTenor: checkParallelVulnerableInterval(soprano, tenor),
    sopranoBass: checkParallelVulnerableInterval(soprano, bass),
    altoTenor: checkParallelVulnerableInterval(alto, tenor),
    altoBass: checkParallelVulnerableInterval(alto, bass),
    tenorBass: checkParallelVulnerableInterval(tenor, bass),
  };
}

function getParallelIntervalsErrors(
  {
    barNumber: firstBarNumber,
    beatPosition: firstBeatPosition,
    soprano: firstSoprano,
    alto: firstAlto,
    tenor: firstTenor,
    bass: firstBass,
  }: CheckNotesErrorsParams,
  {
    barNumber: secondBarNumber,
    beatPosition: secondBeatPosition,
    soprano: secondSoprano,
    alto: secondAlto,
    tenor: secondTenor,
    bass: secondBass,
  }: CheckNotesErrorsParams
) {
  const firstBeatVoicesParallelIntervals = getAllVoicesParallelIntervals({
    soprano: firstSoprano,
    alto: firstAlto,
    tenor: firstTenor,
    bass: firstBass,
  });
  const secondBeatVoicesParallelIntervals = getAllVoicesParallelIntervals({
    soprano: secondSoprano,
    alto: secondAlto,
    tenor: secondTenor,
    bass: secondBass,
  });

  const consecutiveBeatsParallelVulnerableIntervals: {
    voices: { topVoice: Voice; bottomVoice: Voice };
    first: ParallelVulnerableInterval | null;
    second: ParallelVulnerableInterval | null;
  }[] = [
    {
      voices: { topVoice: "soprano", bottomVoice: "alto" },
      first: firstBeatVoicesParallelIntervals.sopranoAlto,
      second: secondBeatVoicesParallelIntervals.sopranoAlto,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "tenor" },
      first: firstBeatVoicesParallelIntervals.sopranoTenor,
      second: secondBeatVoicesParallelIntervals.sopranoTenor,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.sopranoBass,
      second: secondBeatVoicesParallelIntervals.sopranoBass,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "tenor" },
      first: firstBeatVoicesParallelIntervals.altoTenor,
      second: secondBeatVoicesParallelIntervals.altoTenor,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.altoBass,
      second: secondBeatVoicesParallelIntervals.altoBass,
    },
    {
      voices: { topVoice: "tenor", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.tenorBass,
      second: secondBeatVoicesParallelIntervals.tenorBass,
    },
  ];

  const errors: HorizontalHarmonyError[] = [];

  for (const {
    voices: { topVoice, bottomVoice },
    first,
    second,
  } of consecutiveBeatsParallelVulnerableIntervals) {
    if (first === null || second === null) {
      continue;
    }

    if (
      (first === "fifth" && second === "fifth") ||
      (first === "fifth" && second === "twelfth") ||
      (first === "twelfth" && second === "fifth")
    ) {
      errors.push({
        type: "parallelFifths",
        topVoice,
        bottomVoice,
        firstBarNumber,
        firstBeatPosition,
        secondBarNumber,
        secondBeatPosition,
      });
    }

    if (first === "octave" && second === "octave") {
      errors.push({
        type: "parallelOctaves",
        topVoice,
        bottomVoice,
        firstBarNumber,
        firstBeatPosition,
        secondBarNumber,
        secondBeatPosition,
      });
    }
  }
  return errors;
}

export function checkTwoConsecutiveBeats(
  firstBeat: BeatProcessedWithBarNumber,
  secondBeat: BeatProcessedWithBarNumber
) {
  if (
    firstBeat.soprano?.type !== "note" ||
    firstBeat.alto?.type !== "note" ||
    firstBeat.tenor?.type !== "note" ||
    firstBeat.bass?.type !== "note" ||
    secondBeat.soprano?.type !== "note" ||
    secondBeat.alto?.type !== "note" ||
    secondBeat.tenor?.type !== "note" ||
    secondBeat.bass?.type !== "note"
  ) {
    return [];
  }

  const parallelIntervalsErrors = getParallelIntervalsErrors(
    {
      barNumber: firstBeat.barNumber,
      beatPosition: firstBeat.beatPosition,
      soprano: firstBeat.soprano,
      alto: firstBeat.alto,
      tenor: firstBeat.tenor,
      bass: firstBeat.bass,
    },
    {
      barNumber: secondBeat.barNumber,
      beatPosition: secondBeat.beatPosition,
      soprano: secondBeat.soprano,
      alto: secondBeat.alto,
      tenor: secondBeat.tenor,
      bass: secondBeat.bass,
    }
  );

  return parallelIntervalsErrors;
}
