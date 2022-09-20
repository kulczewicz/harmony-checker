import {
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  HorizontalHarmonyError,
  Voice,
} from "../../types";
import { calculateTwoNoteSymbolsDistance } from "../calculateStaffElementsPositions.utils";

const FIFTH_NOTES_DISTANCE = 4;
const OCTAVE_NOTES_DISTANCE = 7;
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
    firstTopVoice: NoteElementProcessed;
    firstBottomVoice: NoteElementProcessed;
    secondTopVoice: NoteElementProcessed;
    secondBottomVoice: NoteElementProcessed;
  }[] = [
    {
      voices: { topVoice: "soprano", bottomVoice: "alto" },
      first: firstBeatVoicesParallelIntervals.sopranoAlto,
      second: secondBeatVoicesParallelIntervals.sopranoAlto,
      firstTopVoice: firstSoprano,
      firstBottomVoice: firstAlto,
      secondTopVoice: secondSoprano,
      secondBottomVoice: secondAlto,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "tenor" },
      first: firstBeatVoicesParallelIntervals.sopranoTenor,
      second: secondBeatVoicesParallelIntervals.sopranoTenor,
      firstTopVoice: firstSoprano,
      firstBottomVoice: firstTenor,
      secondTopVoice: secondSoprano,
      secondBottomVoice: secondTenor,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.sopranoBass,
      second: secondBeatVoicesParallelIntervals.sopranoBass,
      firstTopVoice: firstSoprano,
      firstBottomVoice: firstBass,
      secondTopVoice: secondSoprano,
      secondBottomVoice: secondBass,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "tenor" },
      first: firstBeatVoicesParallelIntervals.altoTenor,
      second: secondBeatVoicesParallelIntervals.altoTenor,
      firstTopVoice: firstAlto,
      firstBottomVoice: firstTenor,
      secondTopVoice: secondAlto,
      secondBottomVoice: secondTenor,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.altoBass,
      second: secondBeatVoicesParallelIntervals.altoBass,
      firstTopVoice: firstAlto,
      firstBottomVoice: firstBass,
      secondTopVoice: secondAlto,
      secondBottomVoice: secondBass,
    },
    {
      voices: { topVoice: "tenor", bottomVoice: "bass" },
      first: firstBeatVoicesParallelIntervals.tenorBass,
      second: secondBeatVoicesParallelIntervals.tenorBass,
      firstTopVoice: firstTenor,
      firstBottomVoice: firstBass,
      secondTopVoice: secondTenor,
      secondBottomVoice: secondBass,
    },
  ];

  const errors: HorizontalHarmonyError[] = [];

  for (const {
    voices: { topVoice, bottomVoice },
    first,
    second,
    firstTopVoice: {
      pitch: firstTopPitch,
      absoluteSignature: firstTopAbsoluteSignature,
    },
    firstBottomVoice: {
      pitch: firstBottomPitch,
      absoluteSignature: firstBottomAbsoluteSignature,
    },
    secondTopVoice: {
      pitch: secondTopPitch,
      absoluteSignature: secondTopAbsoluteSignature,
    },
    secondBottomVoice: {
      pitch: secondBottomPitch,
      absoluteSignature: secondBottomAbsoluteSignature,
    },
  } of consecutiveBeatsParallelVulnerableIntervals) {
    if (first === null || second === null) {
      continue;
    }

    const intervalsAreTheSame =
      firstTopPitch.noteSymbol === secondTopPitch.noteSymbol &&
      firstTopPitch.octave === secondTopPitch.octave &&
      firstTopAbsoluteSignature === secondTopAbsoluteSignature &&
      firstBottomPitch.noteSymbol === secondBottomPitch.noteSymbol &&
      firstBottomPitch.octave === secondBottomPitch.octave &&
      firstBottomAbsoluteSignature === secondBottomAbsoluteSignature;

    if (intervalsAreTheSame) continue;

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
