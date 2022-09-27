import { BarProcessed, Line } from "../types";

interface BreakProcessedBarsIntoLinesParams {
  availableSheetWidth: number;
  bars: BarProcessed[];
}

export function breakProcessedBarsIntoLines({
  availableSheetWidth,
  bars,
}: BreakProcessedBarsIntoLinesParams) {
  const widthIncreaseFactor = 1.5;

  const lines: Line[] = [{ bars: [], barNumbersRange: { start: 0, end: 0 } }];
  let currentLineIndex = 0;
  let currentLineWidth = 0;
  for (const bar of bars) {
    if (
      currentLineWidth + bar.width * widthIncreaseFactor >
      availableSheetWidth
    ) {
      currentLineIndex++;
      currentLineWidth = 0;
      lines.push({
        bars: [],
        barNumbersRange: {
          start: bar.barNumber,
          end: bar.barNumber,
        },
      });
    }
    lines[currentLineIndex].bars.push(bar);
    lines[currentLineIndex].barNumbersRange.end = bar.barNumber;
    currentLineWidth += bar.width * widthIncreaseFactor;
  }

  return lines;
}
