import { useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, Flex } from "theme-ui";
import { barsState } from "../../NoteInputState";

import { Bar, BarProcessed, Line } from "../../types/data";
import { getLineId } from "../../utils";
import {
  processBar,
  processTimeSignatureChanges,
} from "../../utils/barsPreprocession.utils";
import { breakProcessedBarsIntoLines } from "../../utils/linesPreprocession.utils";
import { BarBlock } from "./Bar";
import { Cursor } from "./Cursor";
import {
  StaffLineBeginning,
  staffLineBeginningWidth,
} from "./StaffLineBeginning";

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

const defaultBars: Bar[] = new Array(20)
  .fill(defaultBar)
  .map((bar, index) => ({ ...bar, barNumber: index }));

const sheetElementId = "sheet";
export function Sheet() {
  const bars = useRecoilValue(barsState);
  const setBars = useSetRecoilState(barsState);
  const [availableSheetWidth, setAvailableSheetWidth] = useState<number>(0);
  const [lines, setLines] = useState<Line[]>([[]]);

  useEffect(() => {
    updateSheetWidth();
    setBars(defaultBars);
  }, []);

  const updateSheetWidth = useCallback(() => {
    const sheetElement = document.getElementById(sheetElementId);
    if (sheetElement?.clientWidth && sheetElement.clientWidth > 0) {
      setAvailableSheetWidth(
        sheetElement.clientWidth - staffLineBeginningWidth
      );
    }
  }, [setAvailableSheetWidth]);

  useEffect(() => {
    const addEventListeners = () => {
      window.addEventListener("resize", updateSheetWidth);
    };
    const removeEventListeners = () => {
      window.removeEventListener("resize", updateSheetWidth);
    };
    addEventListeners();
    return () => removeEventListeners();
  }, [updateSheetWidth]);

  useEffect(() => {
    if (availableSheetWidth <= 0) return;

    const barsWithTimeSignatureChanges = processTimeSignatureChanges(bars);
    const processedBars = barsWithTimeSignatureChanges.map((bar) =>
      processBar(bar)
    );

    setLines(
      breakProcessedBarsIntoLines({
        availableSheetWidth,
        bars: processedBars,
      })
    );
  }, [bars, availableSheetWidth]);

  return (
    <Box id="sheet" sx={{ width: "100%" }}>
      {lines.map((line, lineIndex) => (
        <Flex id={getLineId(lineIndex)} key={lineIndex} sx={{ width: "100%" }}>
          <StaffLineBeginning />
          {line.map((bar) => {
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
