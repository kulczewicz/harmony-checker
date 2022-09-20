import { BarProcessed, OldLine, Line } from "../types";

interface BreakProcessedBarsIntoLinesParams {
  availableSheetWidth: number;
  bars: BarProcessed[];
}

export function breakProcessedBarsIntoLines({
  availableSheetWidth,
  bars,
}: BreakProcessedBarsIntoLinesParams) {
  const widthIncreaseFactor = 1.5;
  // const lines: Line[] = [];
  // const allBarsWidth = bars.reduce((acc, { width }) => {
  //   return acc + width;
  // }, 0);
  // const numberOfLinesRequired = Math.ceil(
  //   (allBarsWidth * widthIncreaseFactor) / availableSheetWidth
  // );

  // const barsPerLine = Math.ceil(bars.length / numberOfLinesRequired);

  // for (let i = 0; i < bars.length; i += barsPerLine) {
  //   lines.push(bars.slice(i, i + barsPerLine));
  // }

  const newLines: Line[] = [
    { bars: [], barNumbersRange: { start: 0, end: 0 } },
  ];
  const lines: OldLine[] = [[]];
  let currentLineIndex = 0;
  let currentLineWidth = 0;
  for (const bar of bars) {
    if (
      currentLineWidth + bar.width * widthIncreaseFactor >
      availableSheetWidth
    ) {
      console.log("newline");
      currentLineIndex++;
      currentLineWidth = 0;
      lines.push([]);
      newLines.push({
        bars: [],
        barNumbersRange: {
          start: bar.barNumber,
          end: bar.barNumber,
        },
      });
    }
    lines[currentLineIndex].push(bar);
    newLines[currentLineIndex].bars.push(bar);
    newLines[currentLineIndex].barNumbersRange.end = bar.barNumber;
    console.log(newLines);
    currentLineWidth += bar.width * widthIncreaseFactor;
  }

  return newLines;
}
