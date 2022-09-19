import {
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  TwoBeatsHarmonyError,
  Voice,
} from "../../types";
import { calculateTwoNoteSymbolsDistance } from "../calculateStaffElementsPositions.utils";

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
function getAllVoicesDistances({
  soprano,
  alto,
  tenor,
  bass,
}: Pick<CheckNotesErrorsParams, "soprano" | "alto" | "tenor" | "bass">): {
  sopranoAlto: VoicesDistances;
  sopranoTenor: VoicesDistances;
  sopranoBass: VoicesDistances;
  altoTenor: VoicesDistances;
  altoBass: VoicesDistances;
  tenorBass: VoicesDistances;
} {
  const sopranoAltoDistance = calculateTwoNoteSymbolsDistance(
    soprano.pitch,
    alto.pitch
  );
  const sopranoTenorDistance = calculateTwoNoteSymbolsDistance(
    soprano.pitch,
    tenor.pitch
  );
  const sopranoBassDistance = calculateTwoNoteSymbolsDistance(
    soprano.pitch,
    bass.pitch
  );
  const altoTenorDistance = calculateTwoNoteSymbolsDistance(
    alto.pitch,
    tenor.pitch
  );
  const altoBassDistance = calculateTwoNoteSymbolsDistance(
    alto.pitch,
    bass.pitch
  );
  const tenorBassDistance = calculateTwoNoteSymbolsDistance(
    tenor.pitch,
    bass.pitch
  );

  return {
    sopranoAlto: {
      distance: sopranoAltoDistance,
      signaturesSame: soprano.absoluteSignature === alto.absoluteSignature,
    },
    sopranoTenor: {
      distance: sopranoTenorDistance,
      signaturesSame: soprano.absoluteSignature === tenor.absoluteSignature,
    },
    sopranoBass: {
      distance: sopranoBassDistance,
      signaturesSame: soprano.absoluteSignature === bass.absoluteSignature,
    },
    altoTenor: {
      distance: altoTenorDistance,
      signaturesSame: alto.absoluteSignature === tenor.absoluteSignature,
    },
    altoBass: {
      distance: altoBassDistance,
      signaturesSame: alto.absoluteSignature === bass.absoluteSignature,
    },
    tenorBass: {
      distance: tenorBassDistance,
      signaturesSame: tenor.absoluteSignature === bass.absoluteSignature,
    },
  };
}

const FIFTH_NOTES_DISTANCE = 4;
const OCTAVE_NOTES_DISTANCE = 6;
const TWELFTH_NOTES_DISTANCE = 11;
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
  const firstBeatVoicesDistance = getAllVoicesDistances({
    soprano: firstSoprano,
    alto: firstAlto,
    tenor: firstTenor,
    bass: firstBass,
  });
  const secondBeatVoicesDistance = getAllVoicesDistances({
    soprano: secondSoprano,
    alto: secondAlto,
    tenor: secondTenor,
    bass: secondBass,
  });

  const twoBeatsDistances: {
    voices: { topVoice: Voice; bottomVoice: Voice };
    first: VoicesDistances;
    second: VoicesDistances;
    firstTop: NoteElementProcessed;
    firstBottom: NoteElementProcessed;
    secondTop: NoteElementProcessed;
    secondBottom: NoteElementProcessed;
  }[] = [
    {
      voices: { topVoice: "soprano", bottomVoice: "alto" },
      first: firstBeatVoicesDistance.sopranoAlto,
      second: secondBeatVoicesDistance.sopranoAlto,
      firstTop: firstSoprano,
      firstBottom: firstAlto,
      secondTop: secondSoprano,
      secondBottom: secondAlto,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "tenor" },
      first: firstBeatVoicesDistance.sopranoTenor,
      second: secondBeatVoicesDistance.sopranoTenor,
      firstTop: firstSoprano,
      firstBottom: firstAlto,
      secondTop: secondSoprano,
      secondBottom: secondAlto,
    },
    {
      voices: { topVoice: "soprano", bottomVoice: "bass" },
      first: firstBeatVoicesDistance.sopranoBass,
      second: secondBeatVoicesDistance.sopranoBass,
      firstTop: firstSoprano,
      firstBottom: firstBass,
      secondTop: secondSoprano,
      secondBottom: secondBass,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "tenor" },
      first: firstBeatVoicesDistance.altoTenor,
      second: secondBeatVoicesDistance.altoTenor,
      firstTop: firstAlto,
      firstBottom: firstTenor,
      secondTop: secondAlto,
      secondBottom: secondTenor,
    },
    {
      voices: { topVoice: "alto", bottomVoice: "bass" },
      first: firstBeatVoicesDistance.altoBass,
      second: secondBeatVoicesDistance.altoBass,
      firstTop: firstAlto,
      firstBottom: firstBass,
      secondTop: secondAlto,
      secondBottom: secondBass,
    },
    {
      voices: { topVoice: "tenor", bottomVoice: "bass" },
      first: firstBeatVoicesDistance.tenorBass,
      second: secondBeatVoicesDistance.tenorBass,
      firstTop: firstTenor,
      firstBottom: firstBass,
      secondTop: secondTenor,
      secondBottom: secondBass,
    },
  ];

  const errors: TwoBeatsHarmonyError[] = [];

  for (const {
    voices: { topVoice, bottomVoice },
    first,
    second,
    firstTop: {
      pitch: firstTopPitch,
      absoluteSignature: firstTopAbsoluteSignature,
    },
    firstBottom: {
      pitch: firstBottomPitch,
      absoluteSignature: firstBottomAbsoluteSignature,
    },
    secondTop: {
      pitch: secondTopPitch,
      absoluteSignature: secondTopAbsoluteSignature,
    },
    secondBottom: {
      pitch: secondBottomPitch,
      absoluteSignature: secondBottomAbsoluteSignature,
    },
  } of twoBeatsDistances) {
    if (
      firstTopPitch.noteSymbol === secondTopPitch.noteSymbol &&
      firstTopPitch.octave === secondTopPitch.octave &&
      firstTopAbsoluteSignature === secondTopAbsoluteSignature &&
      firstBottomPitch.noteSymbol === secondBottomPitch.noteSymbol &&
      firstBottomPitch.octave === secondBottomPitch.octave &&
      firstBottomAbsoluteSignature === secondBottomAbsoluteSignature
    ) {
      continue;
    }
    if (first.signaturesSame && second.signaturesSame) {
      if (
        (first.distance === FIFTH_NOTES_DISTANCE &&
          second.distance === FIFTH_NOTES_DISTANCE) ||
        (first.distance === FIFTH_NOTES_DISTANCE &&
          second.distance === TWELFTH_NOTES_DISTANCE) ||
        (first.distance === TWELFTH_NOTES_DISTANCE &&
          second.distance === FIFTH_NOTES_DISTANCE)
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
      if (
        first.distance === OCTAVE_NOTES_DISTANCE &&
        second.distance === OCTAVE_NOTES_DISTANCE
      ) {
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
