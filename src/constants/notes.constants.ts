import { LowestNoteOctave, NotePitch, NoteSymbol, Voice } from "../types";

export const lowestNoteInViolinStaff: NotePitch = {
  noteSymbol: "F",
  octave: 3,
  accidental: null,
};
export const lowestNoteInBassStaff: NotePitch = {
  noteSymbol: "A",
  octave: 1,
  accidental: null,
};

export const highestNoteInViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 6,
  accidental: null,
};
export const highestNoteInBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 4,
  accidental: null,
};

export const lowestNoteWithoutLedgerLineViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 4,
  accidental: null,
};
export const lowestNoteWithoutLedgerLineBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 2,
  accidental: null,
};

export const highestNoteWithoutLedgerLineViolinStaff: NotePitch = {
  noteSymbol: "F",
  octave: 5,
  accidental: null,
};
export const highestNoteWithoutLedgerLineBassStaff: NotePitch = {
  noteSymbol: "A",
  octave: 3,
  accidental: null,
};

export const voiceRange: {
  [voice in Voice]: { lowest: NotePitch; highest: NotePitch };
} = {
  soprano: {
    lowest: { octave: 4, noteSymbol: "C", accidental: null },
    highest: { octave: 5, noteSymbol: "A", accidental: null },
  },
  alto: {
    lowest: { octave: 3, noteSymbol: "F", accidental: null },
    highest: { octave: 5, noteSymbol: "D", accidental: null },
  },
  tenor: {
    lowest: { octave: 3, noteSymbol: "C", accidental: null },
    highest: { octave: 4, noteSymbol: "G", accidental: null },
  },
  bass: {
    lowest: { octave: 2, noteSymbol: "E", accidental: null },
    highest: { octave: 4, noteSymbol: "E", accidental: null },
  },
};

export const numberOfKeysInOctave = 12 as const;
export const contraOctaveCNoteKeyNumber = 4 as const;
export const contraOctaveNumber: LowestNoteOctave = 1;

export const distanceFromCNoteToAnotherNoteInKeys: {
  [noteSymbol in NoteSymbol]: number;
} = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};
