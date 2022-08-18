import { NoteDuration } from "../../../types/data";
import {
  EighthsNoteDown,
  EighthsNoteUp,
  HalfNoteDown,
  HalfNoteUp,
  QuarterNoteDown,
  QuarterNoteUp,
  SixteenthNoteDown,
  SixteenthNoteUp,
  ThirtySecondNoteDown,
  ThirtySecondNoteUp,
} from "../../Notation";

export function getNoteUpSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteUp;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteUp;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteUp;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteUp;
  }
  return ThirtySecondNoteUp;
}

export function getNoteDownSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteDown;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteDown;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteDown;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteDown;
  }
  return ThirtySecondNoteDown;
}
