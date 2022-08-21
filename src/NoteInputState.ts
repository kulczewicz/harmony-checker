import { atom } from "recoil";
import { DurationValue, NotationElementType, Voice } from "./types";

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
