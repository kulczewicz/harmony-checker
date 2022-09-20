import { BeatHarmonyError } from "../../types";

export function getErrorMessage({
  type,
  topVoice,
  bottomVoice,
}: BeatHarmonyError) {
  if (type === "voiceCrossing") {
    return `Voice crossing between ${topVoice} and ${bottomVoice}`;
  }
  if (type === "parallelFifths") {
    return `Parallel fifth at ${topVoice} and ${bottomVoice}`;
  }
  if (type === "parallelOctaves") {
    return `Parallel octave at ${topVoice} and ${bottomVoice}`;
  }
  if (type === "voiceDistance") {
    let message = "Distance between voices";
    if (topVoice === "soprano" && bottomVoice === "alto") {
      return `${message}: should not exceed an octave`;
    }
    if (topVoice === "alto" && bottomVoice === "tenor") {
      return `${message}: should not exceed a seventh`;
    }
    if (topVoice === "tenor" && bottomVoice === "bass") {
      return `${message}: should not exceed two octaves`;
    }
    return message;
  }
  return "";
}
