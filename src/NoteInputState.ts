import { atom } from "recoil";
import {
  Bar,
  Beat,
  DurationValue,
  SelectedElement,
  NotationElementType,
  TimeSignature,
  Voice,
} from "./types";

export const inputElementState = atom<{
  type: NotationElementType;
  durationValue: DurationValue;
}>({
  key: "inputElement",
  default: { type: "note", durationValue: "quarter" },
});

export const inputDotOnState = atom<boolean>({
  key: "inputDotOn",
  default: false,
});

export const inputVoiceState = atom<Voice>({
  key: "inputVoice",
  default: "soprano",
});

export const selectedElementState = atom<SelectedElement | null>({
  key: "selectedElement",
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
