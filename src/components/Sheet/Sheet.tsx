import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Flex } from "theme-ui";
import { sheetState } from "../../NoteInputState";
import { Bar, Line } from "../../types/data";
import { getLineId } from "../../utils";
// import {
//   processBar,
//   processTimeSignatureChanges,
// } from "../../utils/barsPreprocession.utils";
import { BarBlock } from "./Bar";
import { Cursor } from "./Cursor";
import { Keys } from "./Keys";
import { StaffLineBeginning } from "./StaffLineBeginning";

const defaultBar: Omit<Bar, "barNumber" | "timeSignatureChange"> = {
  timeSignature: {
    topNumber: 4,
    bottomNumber: 4,
  },
  beats: [
    {
      beatPosition: 0,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "quarter" },
        position: 0,
        pitch: { octave: 4, noteSymbol: "D" },
      },
      alto: {
        type: "note",
        voice: "alto",
        duration: { value: "half" },
        position: 0,
        pitch: { octave: 4, noteSymbol: "C" },
      },
      tenor: {
        type: "rest",
        duration: { value: "quarter" },
        position: 0,
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "quarter" },
        position: 0,
        pitch: { octave: 3, noteSymbol: "A" },
      },
    },
    {
      beatPosition: 8,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "quarter" },
        position: 8,
        pitch: { octave: 4, noteSymbol: "B" },
      },
      tenor: {
        type: "note",
        voice: "tenor",
        duration: { value: "quarter" },
        position: 8,
        pitch: { octave: 3, noteSymbol: "B" },
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "quarter" },
        position: 8,
        pitch: { octave: 3, noteSymbol: "D" },
      },
    },
    {
      beatPosition: 16,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "eights" },
        position: 16,
        pitch: { octave: 4, noteSymbol: "G" },
      },
      alto: {
        type: "note",
        voice: "alto",
        duration: { value: "half" },
        position: 16,
        pitch: { octave: 4, noteSymbol: "E" },
      },
      tenor: {
        type: "rest",
        duration: { value: "half" },
        position: 16,
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "half" },
        position: 16,
        pitch: { octave: 3, noteSymbol: "G" },
      },
    },
    {
      beatPosition: 20,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "quarter" },
        position: 20,
        pitch: { octave: 4, noteSymbol: "A" },
      },
    },
    {
      beatPosition: 28,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "eights" },
        position: 28,
        pitch: { octave: 5, noteSymbol: "C" },
      },
    },
  ],
};

const allBars: Bar[] = new Array(10)
  .fill(defaultBar)
  .map((bar, index) => ({ ...bar, barNumber: index }));

const defaultSheetData = [
  new Array(3)
    .fill(defaultBar)
    .map((bar, index) => ({ barNumber: index, ...bar })),
  new Array(2)
    .fill(defaultBar)
    .map((bar, index) => ({ barNumber: index, ...bar })),
];

interface GetPreviousBarTimeSignatureParams {
  barIndex: number;
  lineIndex: number;
  lines: Line[];
}
function getPreviousBarTimeSignature({}: GetPreviousBarTimeSignatureParams) {}

export function Sheet() {
  const sheetData = useRecoilValue(sheetState);
  const setSheetData = useSetRecoilState(sheetState);

  useEffect(() => {
    setSheetData(defaultSheetData);

    const firstLineEl = document.getElementById(getLineId(0));
    if (firstLineEl) {
      const { clientWidth } = firstLineEl;
      // console.log({ clientWidth });
    }
  }, []);

  // console.log(
  //   processTimeSignatureChanges(allBars).map((bar) => processBar(bar))
  // );

  return (
    <Box id="sheet" sx={{ width: "100%" }}>
      {sheetData.map((line, lineIndex, lines) => (
        <Flex id={getLineId(lineIndex)} key={lineIndex} sx={{ width: "100%" }}>
          <StaffLineBeginning />
          {line.map((bar, barIndex, bars) => {
            return (
              <BarBlock
                key={bar.barNumber}
                bar={bar}
                previousBarTimeSignature={undefined}
              />
            );
          })}
        </Flex>
      ))}
      {/* <Cursor bars={bars} barNumber={1} beatPositions={[0, 8, 16, 24, 28]} /> */}
    </Box>
  );
}
