export const getBarId = (barNumber: number) => `bar-${barNumber}`;
export const getLineId = (lineNumber: number) => `line-${lineNumber}`;

export const getBeatId = (barNumber: number, beatPosition: number) =>
  `beat-${barNumber}-${beatPosition}`;
