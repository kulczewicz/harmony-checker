import { NotePitch, Voice } from "../types";

export const lowestNoteInViolinStaff: NotePitch = {
  noteSymbol: "F",
  octave: 3,
};
export const lowestNoteInBassStaff: NotePitch = {
  noteSymbol: "A",
  octave: 1,
};

export const highestNoteInViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 6,
};
export const highestNoteInBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 4,
};

export const lowestNoteWithoutLedgerLineViolinStaff: NotePitch = {
  noteSymbol: "E",
  octave: 4,
};
export const lowestNoteWithoutLedgerLineBassStaff: NotePitch = {
  noteSymbol: "G",
  octave: 2,
};

export const highestNoteWithoutLedgerLineViolinStaff: NotePitch = {
  noteSymbol: "F",
  octave: 5,
};
export const highestNoteWithoutLedgerLineBassStaff: NotePitch = {
  noteSymbol: "A",
  octave: 3,
};

export const voiceRange: {
  [voice in Voice]: { lowest: NotePitch; highest: NotePitch };
} = {
  soprano: {
    lowest: { octave: 4, noteSymbol: "C" },
    highest: { octave: 5, noteSymbol: "A" },
  },
  alto: {
    lowest: { octave: 3, noteSymbol: "F" },
    highest: { octave: 5, noteSymbol: "D" },
  },
  tenor: {
    lowest: { octave: 3, noteSymbol: "C" },
    highest: { octave: 4, noteSymbol: "G" },
  },
  bass: {
    lowest: { octave: 2, noteSymbol: "E" },
    highest: { octave: 4, noteSymbol: "E" },
  },
};
