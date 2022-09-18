import { SvgPropsThemeUi } from "../../types";
import {
  NoteAccidental,
  DurationValue,
  TimeSignatureNumber,
} from "../../types/data";
import {
  FlatAccidental,
  NaturalAccidental,
  SharpAccidental,
} from "./AccidentalSvgs";
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

export const AccidentalSvg: {
  [accidental in NoteAccidental]: (props: SvgPropsThemeUi) => JSX.Element;
} = {
  flat: FlatAccidental,
  sharp: SharpAccidental,
  natural: NaturalAccidental,
};

export * from "./AccidentalSvgs";
