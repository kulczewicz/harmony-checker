import React, { memo } from "react";
import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight, staffVerticalPadding } from "../../../constants";
import {
  BarProcessed,
  NoteElement,
  NoteOctave,
  NoteSymbol,
  Voice,
} from "../../../types";
import { TimeSignatures } from "../TimeSignatures";
import { BeatBlock } from "./Beat";

export interface PreviewInputData {
  element: NoteElement;
  beatPosition: number;
}
interface BarProps {
  bar: BarProcessed;
  selectedBeatPosition: number | null;
  selectedVoice: Voice | null;
  previewNoteSymbol: NoteSymbol | null;
  previewNoteOctave: NoteOctave | null;
  previewBeatPosition: number | null;
  previewVoice: Voice | null;
}
function BarBlockComponent({
  bar: { barNumber, timeSignature, beats, timeSignatureChange },
  selectedBeatPosition,
  selectedVoice,
  previewNoteSymbol,
  previewNoteOctave,
  previewBeatPosition,
  previewVoice,
}: BarProps) {
  return (
    <>
      {timeSignatureChange ? (
        <TimeSignatures timeSignature={timeSignature} />
      ) : null}
      {beats.map((beat) => {
        const beatSelected = selectedBeatPosition === beat.beatPosition;
        const selectedVoiceInBeat = beatSelected ? selectedVoice : null;
        const beatPreviewNoteSymbol =
          previewBeatPosition === beat.beatPosition ? previewNoteSymbol : null;
        const beatPreviewNoteOctave =
          previewBeatPosition === beat.beatPosition ? previewNoteOctave : null;
        return (
          <BeatBlock
            key={beat.beatPosition}
            barNumber={barNumber}
            beat={beat}
            selectedVoice={selectedVoiceInBeat}
            previewVoice={previewVoice}
            previewNoteSymbol={beatPreviewNoteSymbol}
            previewNoteOctave={beatPreviewNoteOctave}
          />
        );
      })}
      <Box
        sx={{
          my: `${staffVerticalPadding}px`,
          height: `${sheetHeight}px`,
          width: "1px",
          borderRight: "1px solid",
          borderColor: "black",
        }}
      />
    </>
  );
}

export const BarBlock = memo(BarBlockComponent);
