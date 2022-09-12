import { NoteValue, TimeSignatureBottomNumber } from "../types";

export const baseDurationUnit = 32;

export const durationOfTimeSignatureBottom: {
  [num in TimeSignatureBottomNumber]: number;
} = {
  2: baseDurationUnit / 2,
  4: baseDurationUnit / 4,
  8: baseDurationUnit / 8,
};

export const durationByNoteValue: {
  [duration in NoteValue]: number;
} = {
  whole: 32,
  half: 16,
  quarter: 8,
  eights: 4,
  sixteenth: 2,
  thirtySecond: 1,
};

export const noteValueByDuration: {
  [duration in number]: NoteValue;
} = {
  32: "whole",
  16: "half",
  8: "quarter",
  4: "eights",
  2: "sixteenth",
  1: "thirtySecond",
};
