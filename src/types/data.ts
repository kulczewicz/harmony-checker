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
export type LowestNoteOctave = 1;
export type NoteOctave = LowestNoteOctave | 2 | 3 | 4 | 5 | 6; // others are out of the voice range
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

export type NoteAccidental = "natural" | "flat" | "sharp";

export type Voice = "soprano" | "alto" | "tenor" | "bass";

export interface NotePitch {
  octave: NoteOctave;
  noteSymbol: NoteSymbol;
  accidental: NoteAccidental | null;
}

export type KeySignatureNumberOfSymbols = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type KeySignatureSymbol = "flat" | "sharp";

export interface KeySignatureSymbols {
  signatureSymbol: KeySignatureSymbol;
  numberOfSymbols: KeySignatureNumberOfSymbols;
}

export interface MusicKey {
  mode: "major" | "minor";
  note: NoteSymbol;
  signature: KeySignatureSymbol | null;
}

export type SignatureSymbolsForNotesInKey = {
  [note in NoteSymbol]: KeySignatureSymbol | null;
};

interface BaseElement {
  type: NotationElementType;
  duration: ElementDuration; // offset from the beginning of the bar
  voice: Voice;
}
export interface NoteElement extends BaseElement {
  type: "note";
  pitch: NotePitch;
}
export interface RestElement extends BaseElement {
  type: "rest";
}
export type NotationElement = NoteElement | RestElement;

interface BaseElementProcessed extends BaseElement {
  leftOffset: number;
}
export interface NoteElementProcessed extends BaseElementProcessed {
  type: "note";
  pitch: NotePitch;
  absoluteSignature: KeySignatureSymbol | null;
  showAccidental: boolean;
  accidentalLeftOffset?: number;
}
export interface RestElementProcessed extends BaseElementProcessed {
  type: "rest";
}
export type NotationElementProcessed =
  | NoteElementProcessed
  | RestElementProcessed;

export type NoteSopranoPitch =
  | {
      octave: 4;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 5;
      noteSymbol: Exclude<NoteSymbol, "B">;
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

export type NoteTenorPitch =
  | {
      octave: 3;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 4;
      noteSymbol: Exclude<NoteSymbol, "A" | "B">;
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

export interface Beat {
  beatPosition: number;
  soprano?: NotationElement;
  alto?: NotationElement;
  tenor?: NotationElement;
  bass?: NotationElement;
}

export interface BeatProcessed {
  beatPosition: number;
  width: number;
  soprano?: NotationElementProcessed;
  alto?: NotationElementProcessed;
  tenor?: NotationElementProcessed;
  bass?: NotationElementProcessed;
}

export interface BeatProcessedWithBarNumber extends BeatProcessed {
  barNumber: number;
}

export type Line = BarProcessed[];

export interface SelectedElement {
  element: NotationElement;
  barNumber: number;
  beatPosition: number;
}

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

export interface StaffElements {
  topElement?: NotationElementProcessed;
  bottomElement?: NotationElementProcessed;
}

export interface BeatHarmonyError {
  type: "voiceCrossing" | "voiceDistance";
  barNumber: number;
  beatPosition: number;
  topVoice: Voice;
  bottomVoice: Voice;
}
export type HarmonyError = BeatHarmonyError;
