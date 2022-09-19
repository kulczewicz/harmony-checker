import {
  VerticalHarmonyError,
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  Voice,
} from "../../types";
import { calculateTwoNoteSymbolsDistance } from "../calculateStaffElementsPositions.utils";

interface CheckNotesErrorsParams {
  soprano: NoteElementProcessed;
  alto: NoteElementProcessed;
  tenor: NoteElementProcessed;
  bass: NoteElementProcessed;
}
function getVoiceCrossingErrors({
  soprano,
  alto,
  tenor,
  bass,
}: CheckNotesErrorsParams) {
  const errors: Pick<VerticalHarmonyError, "topVoice" | "bottomVoice">[] = [];
  const elementsTopBottom: { voice: Voice; element: NoteElementProcessed }[] = [
    { voice: "soprano", element: soprano },
    { voice: "alto", element: alto },
    { voice: "tenor", element: tenor },
    { voice: "bass", element: bass },
  ];
  for (
    let elementIndex = 0;
    elementIndex < elementsTopBottom.length - 1;
    elementIndex++
  ) {
    const { voice: topVoice, element: topElement } =
      elementsTopBottom[elementIndex];
    const { voice: bottomVoice, element: bottomElement } =
      elementsTopBottom[elementIndex + 1];
    const topBottomDistance = calculateTwoNoteSymbolsDistance(
      topElement.pitch,
      bottomElement.pitch
    );
    if (
      topBottomDistance < 0 ||
      (topBottomDistance === 1 &&
        topElement.absoluteSignature === "flat" &&
        bottomElement.absoluteSignature === "sharp")
    ) {
      errors.push({ topVoice, bottomVoice });
    }
  }
  return errors;
}

function getVoiceDistanceErrors({
  soprano,
  alto,
  tenor,
  bass,
}: CheckNotesErrorsParams) {
  const errors: Pick<VerticalHarmonyError, "topVoice" | "bottomVoice">[] = [];
  const sopranoAltoDistance = calculateTwoNoteSymbolsDistance(
    soprano.pitch,
    alto.pitch
  );
  if (sopranoAltoDistance > 7) {
    errors.push({ topVoice: "soprano", bottomVoice: "alto" });
  }
  const altoTenorDistance = calculateTwoNoteSymbolsDistance(
    alto.pitch,
    tenor.pitch
  );
  if (altoTenorDistance > 6) {
    errors.push({ topVoice: "alto", bottomVoice: "tenor" });
  }
  const tenorBassDistance = calculateTwoNoteSymbolsDistance(
    tenor.pitch,
    bass.pitch
  );
  if (tenorBassDistance > 14) {
    errors.push({ topVoice: "tenor", bottomVoice: "bass" });
  }
  return errors;
}

export function checkBeat({
  soprano,
  alto,
  tenor,
  bass,
  beatPosition,
  barNumber,
}: BeatProcessedWithBarNumber) {
  if (
    soprano?.type !== "note" ||
    alto?.type !== "note" ||
    tenor?.type !== "note" ||
    bass?.type !== "note"
  ) {
    return [];
  }
  const voiceCrossingErrors: VerticalHarmonyError[] = getVoiceCrossingErrors({
    soprano,
    alto,
    tenor,
    bass,
  }).map((voiceCrossing) => ({
    ...voiceCrossing,
    type: "voiceCrossing",
    barNumber,
    beatPosition,
  }));

  const voiceDistanceErrors: VerticalHarmonyError[] = getVoiceDistanceErrors({
    soprano,
    alto,
    tenor,
    bass,
  }).map((voiceDistance) => ({
    ...voiceDistance,
    type: "voiceDistance",
    barNumber,
    beatPosition,
  }));

  return [...voiceCrossingErrors, ...voiceDistanceErrors];
}
