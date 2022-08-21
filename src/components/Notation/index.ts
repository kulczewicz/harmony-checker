import { SvgPropsThemeUi } from "../../types";
import { DurationValue } from "../../types/data";
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
  WholeNote,
} from "./Notes";
import {
  EighthRest,
  HalfRest,
  QuarterRest,
  SixteenthRest,
  ThirtySecondRest,
  WholeRest,
} from "./Rests";

export * from "./Notes";
export * from "./KeySvgs";
export * from "./Rests";

type ElementSvg = {
  [duration in DurationValue]: (props: SvgPropsThemeUi) => JSX.Element;
};

export const ElementNoteSvgUp: ElementSvg = {
  whole: WholeNote,
  half: HalfNoteUp,
  quarter: QuarterNoteUp,
  eights: EighthsNoteUp,
  sixteenth: SixteenthNoteUp,
  thirtySecond: ThirtySecondNoteUp,
} as const;

export const ElementNoteSvgDown: ElementSvg = {
  whole: WholeNote,
  half: HalfNoteDown,
  quarter: QuarterNoteDown,
  eights: EighthsNoteDown,
  sixteenth: SixteenthNoteDown,
  thirtySecond: ThirtySecondNoteDown,
} as const;

export const ElementRestSvg: ElementSvg = {
  whole: WholeRest,
  half: HalfRest,
  quarter: QuarterRest,
  eights: EighthRest,
  sixteenth: SixteenthRest,
  thirtySecond: ThirtySecondRest,
} as const;
