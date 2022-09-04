import { BarProcessed, Line } from "../types";

interface CalculateLineBreaksParams {
  availableSheetWidth: number;
  bars: BarProcessed[];
}

export function breakProcessedBarsIntoLines({
  availableSheetWidth,
  bars,
}: CalculateLineBreaksParams) {
  const lines: Line[] = [];

  const widthIncreaseFactor = 1.5;
  const allBarsWidth = bars.reduce((acc, { width }) => {
    return acc + width;
  }, 0);
  const numberOfLinesRequired = Math.ceil(
    (allBarsWidth * widthIncreaseFactor) / availableSheetWidth
  );

  const barsPerLine = Math.ceil(bars.length / numberOfLinesRequired);

  for (let i = 0; i < bars.length; i += barsPerLine) {
    lines.push(bars.slice(i, i + barsPerLine));
  }

  return lines;
}
