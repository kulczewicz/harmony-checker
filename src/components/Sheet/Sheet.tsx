import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Flex } from "theme-ui";
import { useCursor, useBars } from "../../hooks";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useMusicKey } from "../../hooks/useMusicKey";
import { inputVoiceState } from "../../NoteInputState";

import { Bar, NoteOctave, NoteSymbol, Voice, Line } from "../../types/data";
import { getLineId } from "../../utils";
import { preprocessBars } from "../../utils/barsPreprocession.utils";
import { breakProcessedBarsIntoLines } from "../../utils/linesPreprocession.utils";
import {
  controlPanelButtonWidth,
  InputVoices,
  inputVoicesRightMargin,
} from "../ControlPanel";
import { BarBlock } from "./Bar";
import { EndBarLine } from "./Bar/BarLine";
import {
  StaffLineBeginning,
  staffLineBeginningWidth,
} from "./SheetLineBeginning";

const sheetElementId = "sheet";
export function Sheet() {
  const { bars, loadBarsFromLocalStorage } = useBars();
  const { keySignatureSymbols, signatureSymbolsForNotesInKey } = useMusicKey();
  const [availableSheetWidth, setAvailableSheetWidth] = useState<number>(0);
  const [lines, setLines] = useState<Line[]>([
    { bars: [], barNumbersRange: { start: 0, end: 0 } },
  ]);
  const voice = useRecoilValue(inputVoiceState);
  const {
    selectedBarNumber,
    selectedBeatPosition,
    previewNoteSymbol,
    previewNoteOctave,
    mouseOverBeat,
  } = useCursor({ lines });
  useKeyboard();

  const updateSheetWidth = useCallback(() => {
    const sheetElement = document.getElementById(sheetElementId);
    if (sheetElement?.clientWidth && sheetElement.clientWidth > 0) {
      setAvailableSheetWidth(
        sheetElement.clientWidth - staffLineBeginningWidth
      );
    }
  }, [setAvailableSheetWidth]);

  const processBars = useCallback(
    (bars: Bar[], availableSheetWidth: number) => {
      if (availableSheetWidth <= 0) return;

      const { processedBars } = preprocessBars(
        bars,
        signatureSymbolsForNotesInKey
      );

      const lines = breakProcessedBarsIntoLines({
        availableSheetWidth,
        bars: processedBars,
      });
      setLines(lines);
    },
    [setLines, signatureSymbolsForNotesInKey]
  );

  useEffect(() => {
    updateSheetWidth();

    loadBarsFromLocalStorage();
  }, []);

  useEffect(() => {
    addEventListener("resize", updateSheetWidth);
    return () => removeEventListener("resize", updateSheetWidth);
  }, [updateSheetWidth]);

  useEffect(() => {
    processBars(bars, availableSheetWidth);
  }, [processBars, bars, availableSheetWidth]);

  return (
    <Box id="sheet" sx={{ width: "100%" }}>
      {lines.map(({ bars, barNumbersRange: { start, end } }, lineIndex) => (
        <Flex
          id={getLineId(lineIndex)}
          key={lineIndex}
          sx={{ position: "relative", width: "100%" }}
        >
          <Box
            sx={{
              width: `${controlPanelButtonWidth + inputVoicesRightMargin}px`,
            }}
          >
            {selectedBarNumber !== null &&
            selectedBarNumber >= start &&
            selectedBarNumber <= end ? (
              <InputVoices />
            ) : null}
          </Box>
          <StaffLineBeginning keySignatureSymbols={keySignatureSymbols} />
          {bars.map((bar) => {
            const barSelected = selectedBarNumber === bar.barNumber;
            const barPreview = mouseOverBeat?.barNumber === bar.barNumber;
            const selectedBeatPositionInBar: number | null = barSelected
              ? selectedBeatPosition
              : null;
            const selectedVoice: Voice | null = barSelected ? voice : null;
            const barPreviewNoteSymbol: NoteSymbol | null = barPreview
              ? previewNoteSymbol
              : null;
            const barPreviewNoteOctave: NoteOctave | null = barPreview
              ? previewNoteOctave
              : null;
            const barPreviewBeatPosition = barPreview
              ? mouseOverBeat?.beatPosition
              : null;
            return (
              <BarBlock
                key={bar.barNumber}
                selectedBeatPosition={selectedBeatPositionInBar}
                selectedVoice={selectedVoice}
                previewNoteSymbol={barPreviewNoteSymbol}
                previewNoteOctave={barPreviewNoteOctave}
                previewVoice={voice}
                previewBeatPosition={barPreviewBeatPosition}
                bar={bar}
              />
            );
          })}
          {lineIndex === lines.length - 1 ? <EndBarLine /> : null}
        </Flex>
      ))}
    </Box>
  );
}
