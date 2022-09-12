import { SvgPropsThemeUi } from "../../types";
import { NoteValue, TimeSignatureNumber } from "../../types/data";
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
import {
  TimeSignatureEight,
  TimeSignatureFive,
  TimeSignatureFour,
  TimeSignatureSeven,
  TimeSignatureSix,
  TimeSignatureThree,
  TimeSignatureTwo,
} from "./TimeSignatureSvgs";

type ElementSvg = {
  [duration in NoteValue]: (props: SvgPropsThemeUi) => JSX.Element;
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

type TimeSignatureNumberSvg = {
  [timeSignatureNumber in TimeSignatureNumber]: (
    props: SvgPropsThemeUi
  ) => JSX.Element;
};
export const TimeSignatureNumberSvg: TimeSignatureNumberSvg = {
  2: TimeSignatureTwo,
  3: TimeSignatureThree,
  4: TimeSignatureFour,
  5: TimeSignatureFive,
  6: TimeSignatureSix,
  7: TimeSignatureSeven,
  8: TimeSignatureEight,
};
