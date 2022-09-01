import { atom } from "recoil";
import {
  Beat,
  DurationValue,
  NotationElementType,
  SheetData,
  Voice,
} from "./types";

export const inputOnState = atom<boolean>({
  key: "inputOn",
  default: false,
});

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

const wholeRestsOnZeroPosition: Beat[] = [
  {
    beatPosition: 0,
    soprano: {
      type: "rest",
      duration: { value: "whole" },
      position: 0,
    },
    alto: {
      type: "rest",
      duration: { value: "whole" },
      position: 0,
    },
    tenor: {
      type: "rest",
      duration: { value: "whole" },
      position: 0,
    },
    bass: {
      type: "rest",
      duration: { value: "whole" },
      position: 0,
    },
  },
  // {
  //   beatPosition: 16,
  //   soprano: {
  //     type: "rest",
  //     duration: { value: "half" },
  //     position: 16,
  //   },
  // },
];
export const sheetState = atom<SheetData>({
  key: "sheet",
  default: [
    [
      { barNumber: 0, beats: wholeRestsOnZeroPosition },
      { barNumber: 1, beats: wholeRestsOnZeroPosition },
      { barNumber: 2, beats: wholeRestsOnZeroPosition },
      { barNumber: 3, beats: wholeRestsOnZeroPosition },
    ],
    [
      { barNumber: 4, beats: wholeRestsOnZeroPosition },
      { barNumber: 5, beats: wholeRestsOnZeroPosition },
      { barNumber: 6, beats: wholeRestsOnZeroPosition },
      { barNumber: 7, beats: wholeRestsOnZeroPosition },
    ],
  ],
});

export const timeSignatureState = atom<number>({
  key: "timeSignature",
  default: 32,
});
