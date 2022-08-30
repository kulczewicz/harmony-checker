import { atom } from "recoil";
import { DurationValue, NotationElementType, SheetData, Voice } from "./types";

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

export const sheetState = atom<SheetData>({
  key: "sheet",
  default: [
    [
      { barNumber: 0, beats: [] },
      { barNumber: 1, beats: [] },
      { barNumber: 2, beats: [] },
      { barNumber: 3, beats: [] },
    ],
    [
      { barNumber: 4, beats: [] },
      { barNumber: 5, beats: [] },
      { barNumber: 6, beats: [] },
      { barNumber: 7, beats: [] },
    ],
  ],
});

// export const timeSignatureState = atom<number>({
//   key: "timeSignature",
//   default: 32,
// });
