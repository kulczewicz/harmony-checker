import {
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  HorizontalHarmonyError,
  Voice,
  NotationElementProcessed,
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
  soprano: NotationElementProcessed | undefined;
  alto: NotationElementProcessed | undefined;
  tenor: NotationElementProcessed | undefined;
  bass: NotationElementProcessed | undefined;
}
function getAllVoicesParallelIntervals({
  soprano,
  alto,
  tenor,
  bass,
}: Pick<CheckNotesErrorsParams, "soprano" | "alto" | "tenor" | "bass">) {
  return {
    sopranoAlto:
      soprano?.type === "note" && alto?.type === "note"
        ? checkParallelVulnerableInterval(soprano, alto)
        : null,
    sopranoTenor:
      soprano?.type === "note" && tenor?.type === "note"
        ? checkParallelVulnerableInterval(soprano, tenor)
        : null,
    sopranoBass:
      soprano?.type === "note" && bass?.type === "note"
        ? checkParallelVulnerableInterval(soprano, bass)
        : null,
    altoTenor:
      alto?.type === "note" && tenor?.type === "note"
        ? checkParallelVulnerableInterval(alto, tenor)
        : null,
    altoBass:
      alto?.type === "note" && bass?.type === "note"
        ? checkParallelVulnerableInterval(alto, bass)
        : null,
    tenorBass:
      tenor?.type === "note" && bass?.type === "note"
        ? checkParallelVulnerableInterval(tenor, bass)
        : null,
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
    firstTopVoice: NotationElementProcessed | undefined;
    firstBottomVoice: NotationElementProcessed | undefined;
    secondTopVoice: NotationElementProcessed | undefined;
    secondBottomVoice: NotationElementProcessed | undefined;
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
    firstTopVoice,
    firstBottomVoice,
    secondTopVoice,
    secondBottomVoice,
  } of consecutiveBeatsParallelVulnerableIntervals) {
    if (
      first === null ||
      second === null ||
      firstTopVoice?.type !== "note" ||
      firstBottomVoice?.type !== "note" ||
      secondTopVoice?.type !== "note" ||
      secondBottomVoice?.type !== "note"
    ) {
      continue;
    }

    const intervalsAreTheSame =
      firstTopVoice.pitch.noteSymbol === secondTopVoice.pitch.noteSymbol &&
      firstTopVoice.pitch.octave === secondTopVoice.pitch.octave &&
      firstTopVoice.absoluteSignature === secondTopVoice.absoluteSignature &&
      firstBottomVoice.pitch.noteSymbol ===
        secondBottomVoice.pitch.noteSymbol &&
      firstBottomVoice.pitch.octave === secondBottomVoice.pitch.octave &&
      firstBottomVoice.absoluteSignature ===
        secondBottomVoice.absoluteSignature;

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
