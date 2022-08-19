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
export type NoteOctave = 2 | 3 | 4 | 5 | 6; // others are out of the voice range
// type NotePitch = `${NoteSymbol}${Octave}`;

/* NoteDuration in thirty-second notes - we can get only following values
 * whole note = 32            | whole with dot = 48                | whole with two dots = 56
 * half note = 16             | half with dot = 24                 | half with two dots = 28
 * quarter note = 8           | quarter with dot = 12              | quarter with two dots = 14
 * eighth note = 4            | eighth with dot = 6                | eighth with two dots = 7
 * sixteenth note = 2         | sixteenth with dot = 3             | sixteenth with two dots is a float
 * thirty-second note = 1     | thirty-second with dot is a float  | thirty-second with two dots is a float
 */
export type NoteDuration =
  | 1
  | 2
  | 3
  | 4
  | 6
  | 7
  | 8
  | 12
  | 14
  | 16
  | 24
  | 28
  | 32
  | 48
  | 56;

type NoteAccidental =
  | "natural"
  | "flat"
  | "sharp"
  | "double-flat"
  | "double-sharp";

export type NotePitch = {
  octave: NoteOctave;
  noteSymbol: NoteSymbol;
  accidental?: NoteAccidental;
};
export interface BaseNote {
  duration: NoteDuration;
  position: number; // offset from the beginning of the bar
  pitch: NotePitch;
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
  pitch: NoteSopranoPitch;
}

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
  pitch: NoteAltoPitch;
}

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
  pitch: NoteTenorPitch;
}

export type NoteBassPitch =
  | {
      octave: 2 | 3;
      noteSymbol: NoteSymbol;
    }
  | {
      octave: 3;
      noteSymbol: Extract<NoteSymbol, "C" | "D" | "E">;
    };
export interface NoteBass extends BaseNote {
  pitch: NoteBassPitch;
}

export type Note = NoteSoprano | NoteAlto | NoteTenor | NoteBass;

export interface Bar {
  length: number;
  voices: {
    soprano: NoteSoprano[];
    alto: NoteAlto[];
    tenor: NoteTenor[];
    bass: NoteBass[];
  };
}
