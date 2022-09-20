import { atom } from "recoil";
import {
  Bar,
  Beat,
  DurationValue,
  SelectedElement,
  NotationElementType,
  TimeSignature,
  Voice,
  NoteSymbol,
  NoteOctave,
  NoteAccidental,
  MusicKey,
  KeySignatureSymbols,
  SignatureSymbolsForNotesInKey,
} from "./types";

export const inputElementTypeState = atom<{
  type: NotationElementType;
  noteValue: DurationValue;
}>({
  key: "inputElementType",
  default: { type: "note", noteValue: "quarter" },
});

export const inputDotOnState = atom<boolean>({
  key: "inputDotOn",
  default: false,
});

export const inputVoiceState = atom<Voice>({
  key: "inputVoice",
  default: "soprano",
});

export const selectedAccidentalState = atom<NoteAccidental | null>({
  key: "selectedAccidental",
  default: null,
});

export const selectedBarNumberState = atom<number | null>({
  key: "selectedBarNumber",
  default: null,
});

export const selectedBeatPositionState = atom<number | null>({
  key: "selectedBeatPosition",
  default: null,
});

export const mouseOverBeatState = atom<{
  barNumber: number;
  beatPosition: number;
} | null>({
  key: "mouseOverBeatState",
  default: null,
});

export const previewNoteSymbolState = atom<NoteSymbol | null>({
  key: "previewNoteSymbol",
  default: null,
});

export const previewNoteOctaveState = atom<NoteOctave | null>({
  key: "previewNoteOctave",
  default: null,
});

export const musicKeyState = atom<MusicKey>({
  key: "musicKeyState",
  default: {
    mode: "major",
    note: "C",
    signature: null,
  },
});

export const keySignatureSymbolsState = atom<KeySignatureSymbols | null>({
  key: "keySignatureSymbolsState",
  default: null,
});

export const signatureSymbolsForNotesInKeyState =
  atom<SignatureSymbolsForNotesInKey>({
    key: "signatureSymbolsForNotesInKeyState",
    default: {
      C: null,
      D: null,
      E: null,
      F: null,
      G: null,
      A: null,
      B: null,
    },
  });

const wholeRestsOnZeroPosition: Beat[] = [
  {
    beatPosition: 0,
    soprano: {
      type: "rest",
      voice: "soprano",
      duration: { value: "whole" },
    },
    alto: {
      type: "rest",
      voice: "alto",
      duration: { value: "whole" },
    },
    tenor: {
      type: "rest",
      voice: "tenor",
      duration: { value: "whole" },
    },
    bass: {
      type: "rest",
      voice: "bass",
      duration: { value: "whole" },
    },
  },
];

const defaultTimeSignature: TimeSignature = { bottomNumber: 4, topNumber: 4 };
export const defaultBarWithoutBarNumber = {
  timeSignature: defaultTimeSignature,
  beats: wholeRestsOnZeroPosition,
};
export const defaultBarsState = [
  {
    barNumber: 0,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 1,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 2,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 3,
    ...defaultBarWithoutBarNumber,
  },

  {
    barNumber: 4,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 5,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 6,
    ...defaultBarWithoutBarNumber,
  },
  {
    barNumber: 7,
    ...defaultBarWithoutBarNumber,
  },
];
export const barsState = atom<Bar[]>({
  key: "bars",
  default: defaultBarsState,
});

export const timeSignatureState = atom<number>({
  key: "timeSignature",
  default: 32,
});
