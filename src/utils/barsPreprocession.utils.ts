import { Bar } from "../types";

export function processTimeSignatureChanges(bars: Bar[]) {
  return bars.map(({ timeSignature, ...bar }, index, bars) => {
    const previousElement = bars[index - 1];
    if (
      !previousElement ||
      previousElement.timeSignature.topNumber !== timeSignature.topNumber ||
      previousElement.timeSignature.bottomNumber !== timeSignature.bottomNumber
    ) {
      return { ...bar, timeSignature, timeSignatureChange: true };
    }
    return { ...bar, timeSignature, timeSignatureChange: false };
  });
}

export function calculateBarWidth({ timeSignatureChange, beats }: Bar) {}
