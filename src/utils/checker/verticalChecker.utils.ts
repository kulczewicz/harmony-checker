import {
  VerticalHarmonyError,
  BeatProcessedWithBarNumber,
  NoteElementProcessed,
  Voice,
  NotationElementProcessed,
} from "../../types";
import { calculateTwoNoteSymbolsDistance } from "../calculateStaffElementsPositions.utils";

interface CheckNotesErrorsParams {
  soprano: NotationElementProcessed | undefined;
  alto: NotationElementProcessed | undefined;
  tenor: NotationElementProcessed | undefined;
  bass: NotationElementProcessed | undefined;
}
function getVoiceCrossingErrors({
  soprano,
  alto,
  tenor,
  bass,
}: CheckNotesErrorsParams) {
  const errors: Pick<VerticalHarmonyError, "topVoice" | "bottomVoice">[] = [];
  const elementsTopBottom: { voice: Voice; element: NoteElementProcessed }[] =
    [];

  if (soprano?.type === "note") {
    elementsTopBottom.push({ voice: "soprano", element: soprano });
  }
  if (alto?.type === "note") {
    elementsTopBottom.push({ voice: "alto", element: alto });
  }
  if (tenor?.type === "note") {
    elementsTopBottom.push({ voice: "tenor", element: tenor });
  }
  if (bass?.type === "note") {
    elementsTopBottom.push({ voice: "bass", element: bass });
  }

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

  if (soprano?.type === "note" && alto?.type === "note") {
    const sopranoAltoDistance = calculateTwoNoteSymbolsDistance(
      soprano.pitch,
      alto.pitch
    );
    if (sopranoAltoDistance > 7) {
      errors.push({ topVoice: "soprano", bottomVoice: "alto" });
    }
  }
  if (alto?.type === "note" && tenor?.type === "note") {
    const altoTenorDistance = calculateTwoNoteSymbolsDistance(
      alto.pitch,
      tenor.pitch
    );
    if (altoTenorDistance > 6) {
      errors.push({ topVoice: "alto", bottomVoice: "tenor" });
    }
  }
  if (tenor?.type === "note" && bass?.type === "note") {
    const tenorBassDistance = calculateTwoNoteSymbolsDistance(
      tenor.pitch,
      bass.pitch
    );
    if (tenorBassDistance > 14) {
      errors.push({ topVoice: "tenor", bottomVoice: "bass" });
    }
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
