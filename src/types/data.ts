export type NoteSymbol = "C" | "D" | "E" | "F" | "G" | "A" | "B";
export enum NoteSymbolEnum {
  C,
  D,
  E,
  F,
  G,
  A,
  B,
}
export enum NoteSymbolFromTopEnum {
  B,
  A,
  G,
  F,
  E,
  D,
  C,
}
export type NoteOctave = 1 | 2 | 3 | 4 | 5 | 6; // others are out of the voice range
// type NotePitch = `${NoteSymbol}${Octave}`;

/* NoteDuration in thirty-second notes - we can get only following values
 * whole note = 32            | whole with dot = 48
 * half note = 16             | half with dot = 24
 * quarter note = 8           | quarter with dot = 12
 * eighth note = 4            | eighth with dot = 6
 * sixteenth note = 2         | sixteenth with dot = 3
 * thirty-second note = 1     | thirty-second with dot is a float
 */
export type NoteDurationInThirtySeconds =
  | 1
  | 2
  | 3
  | 4
  | 6
  | 8
  | 12
  | 16
  | 24
  | 32
  | 48;

export type NotationElementType = "note" | "rest";
export type DurationValue =
  | "whole"
  | "half"
  | "quarter"
  | "eights"
  | "sixteenth"
  | "thirtySecond";

export interface ElementDuration {
  value: DurationValue;
  dot?: boolean;
}

type NoteAccidental =
  | "natural"
  | "flat"
  | "sharp"
  | "double-flat"
  | "double-sharp";

export type Voice = "soprano" | "alto" | "tenor" | "bass";

export type NotePitch = {
  octave: NoteOctave;
  noteSymbol: NoteSymbol;
  accidental?: NoteAccidental;
};

export interface BaseElement {
  type: NotationElementType;
  duration: ElementDuration; // offset from the beginning of the bar
  position: number;
}
export interface BaseNote extends BaseElement {
  type: "note";
  voice: Voice;
  pitch: NotePitch;
}
export interface Rest extends BaseElement {
  type: "rest";
}

export type NoteSopranoPitch =
  | {
      octave: 4;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 5;
      noteSymbol: Exclude<NoteSymbol, "B">;
    };
export interface NoteSoprano extends BaseNote {
  voice: "soprano";
  pitch: NoteSopranoPitch;
}

export type ElementSoprano = NoteSoprano | Rest;
export type ElementSopranoProcessed = ElementSoprano & {
  leftOffset: number;
};

export type NoteAltoPitch =
  | {
      octave: 3;
      noteSymbol: Exclude<NoteSymbol, "C" | "D" | "E">;
    }
  | {
      octave: 4;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 5;
      noteSymbol: Extract<NoteSymbol, "C" | "D">;
    };
export interface NoteAlto extends BaseNote {
  voice: "alto";
  pitch: NoteAltoPitch;
}
export type ElementAlto = NoteAlto | Rest;
export type ElementAltoProcessed = ElementAlto & {
  leftOffset: number;
};

export type NoteTenorPitch =
  | {
      octave: 3;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 4;
      noteSymbol: Exclude<NoteSymbol, "A" | "B">;
    };

export interface NoteTenor extends BaseNote {
  voice: "tenor";
  pitch: NoteTenorPitch;
}

export type ElementTenor = NoteTenor | Rest;
export type ElementTenorProcessed = ElementTenor & {
  leftOffset: number;
};

export type NoteBassPitch =
  | {
      octave: 2;
      noteSymbol: Exclude<NoteSymbol, "C" | "D">;
    }
  | {
      octave: 3;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 4;
      noteSymbol: Extract<NoteSymbol, "C" | "D" | "E">;
    };
export interface NoteBass extends BaseNote {
  voice: "bass";
  pitch: NoteBassPitch;
}
export type ElementBassProcessed = ElementBass & {
  leftOffset: number;
};

export type ElementBass = NoteBass | Rest;

export type Note = NoteSoprano | NoteAlto | NoteTenor | NoteBass;

export interface Beat {
  beatPosition: number;
  soprano?: ElementSoprano;
  alto?: ElementAlto;
  tenor?: ElementTenor;
  bass?: ElementBass;
}

export interface BeatProcessed {
  beatPosition: number;
  width: number;
  soprano?: ElementSopranoProcessed;
  alto?: ElementAltoProcessed;
  tenor?: ElementTenorProcessed;
  bass?: ElementBassProcessed;
}

export type StaffElement =
  | ElementSoprano
  | ElementAlto
  | ElementTenor
  | ElementBass;

export type Line = Bar[];
export type SheetData = Line[];

export type TimeSignatureTopNumber = 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type TimeSignatureBottomNumber = 2 | 4 | 8;
export type TimeSignatureNumber =
  | TimeSignatureTopNumber
  | TimeSignatureBottomNumber;
export interface TimeSignature {
  topNumber: TimeSignatureTopNumber;
  bottomNumber: TimeSignatureBottomNumber;
}

export interface Bar {
  timeSignature: TimeSignature;
  barNumber: number;
  beats: Beat[];
}

export interface BarWithTimeSignatureChange extends Bar {
  timeSignatureChange: boolean;
}

export interface BarProcessed extends BarWithTimeSignatureChange {
  width: number;
  beats: BeatProcessed[];
}
