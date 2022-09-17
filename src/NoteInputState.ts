import { atom } from "recoil";
import {
  Bar,
  Beat,
  NoteValue,
  SelectedElement,
  NotationElementType,
  TimeSignature,
  Voice,
  NoteSymbol,
  NoteOctave,
  NoteAccidental,
} from "./types";

export const inputElementTypeState = atom<{
  type: NotationElementType;
  noteValue: NoteValue;
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
export const barsState = atom<Bar[]>({
  key: "bars",
  default: [
    {
      barNumber: 0,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 1,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 2,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 3,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },

    {
      barNumber: 4,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 5,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 6,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
    {
      barNumber: 7,
      timeSignature: defaultTimeSignature,
      beats: wholeRestsOnZeroPosition,
    },
  ],
});

export const timeSignatureState = atom<number>({
  key: "timeSignature",
  default: 32,
});
