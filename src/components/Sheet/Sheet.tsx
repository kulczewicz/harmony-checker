import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Box, Button, Flex } from "theme-ui";
import { useCursor } from "../../hooks";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useMusicKey } from "../../hooks/useMusicKey";
import { barsState, inputVoiceState } from "../../NoteInputState";

import { Bar, Line, NoteOctave, NoteSymbol, Voice } from "../../types/data";
import { getLineId } from "../../utils";
import { preprocessBars } from "../../utils/barsPreprocession.utils";
import { breakProcessedBarsIntoLines } from "../../utils/linesPreprocession.utils";
import { BarBlock } from "./Bar";
import { SheetStaffLines } from "./Staff";
import {
  StaffLineBeginning,
  staffLineBeginningWidth,
} from "./SheetLineBeginning";

const defaultBar: Omit<Bar, "barNumber"> = {
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
        pitch: { octave: 4, noteSymbol: "D", accidental: null },
      },
      alto: {
        type: "note",
        voice: "alto",
        duration: { value: "half" },
        pitch: { octave: 4, noteSymbol: "C", accidental: null },
      },
      tenor: {
        type: "rest",
        voice: "tenor",
        duration: { value: "quarter" },
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "quarter" },
        pitch: { octave: 3, noteSymbol: "A", accidental: null },
      },
    },
    {
      beatPosition: 8,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "quarter" },
        pitch: { octave: 4, noteSymbol: "B", accidental: null },
      },
      tenor: {
        type: "note",
        voice: "tenor",
        duration: { value: "quarter" },
        pitch: { octave: 4, noteSymbol: "E", accidental: null },
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "quarter" },
        pitch: { octave: 3, noteSymbol: "D", accidental: null },
      },
    },
    {
      beatPosition: 16,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "eights" },
        pitch: { octave: 4, noteSymbol: "G", accidental: null },
      },
      alto: {
        type: "note",
        voice: "alto",
        duration: { value: "half" },
        pitch: { octave: 4, noteSymbol: "E", accidental: null },
      },
      tenor: {
        type: "rest",
        voice: "tenor",
        duration: { value: "half" },
      },
      bass: {
        type: "note",
        voice: "bass",
        duration: { value: "half" },
        pitch: { octave: 3, noteSymbol: "G", accidental: null },
      },
    },
    {
      beatPosition: 20,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "quarter" },
        pitch: { octave: 4, noteSymbol: "A", accidental: null },
      },
    },
    {
      beatPosition: 28,
      soprano: {
        type: "note",
        voice: "soprano",
        duration: { value: "eights" },
        pitch: { octave: 5, noteSymbol: "C", accidental: null },
      },
    },
  ],
};

const defaultBars: Bar[] = new Array(10)
  .fill(defaultBar)
  .map((bar, index) => ({ ...bar, barNumber: index }));

const sheetElementId = "sheet";
export function Sheet() {
  const bars = useRecoilValue(barsState);
  const {
    keySignatureSymbols,
    musicKey,
    signatureSymbolsForNotesInKey,
    updateMusicKey,
  } = useMusicKey();
  const [availableSheetWidth, setAvailableSheetWidth] = useState<number>(0);
  const [lines, setLines] = useState<Line[]>([[]]);
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

      const { processedBars, harmonyErrors } = preprocessBars(
        bars,
        signatureSymbolsForNotesInKey
      );

      console.log(harmonyErrors);
      setLines(
        breakProcessedBarsIntoLines({
          availableSheetWidth,
          bars: processedBars,
        })
      );
    },
    [setLines, signatureSymbolsForNotesInKey]
  );

  useEffect(() => {
    updateSheetWidth();
    updateMusicKey({ mode: "major", note: "D", signature: null });
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
      {lines.map((line, lineIndex) => (
        <Flex
          id={getLineId(lineIndex)}
          key={lineIndex}
          sx={{ position: "relative", width: "100%" }}
        >
          <StaffLineBeginning keySignatureSymbols={keySignatureSymbols} />
          <SheetStaffLines />
          {line.map((bar) => {
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
        </Flex>
      ))}
    </Box>
  );
}
