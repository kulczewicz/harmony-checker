import { memo } from "react";
import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight } from "../../../constants";
import {
  BarProcessed,
  NoteElement,
  NoteOctave,
  NoteSymbol,
  Voice,
} from "../../../types";
import { getBarId } from "../../../utils";
import { SheetStaffLines } from "../Staff";
import { TimeSignatures } from "../TimeSignatures";
import { BeatBlock } from "./Beat";

export interface PreviewInputData {
  element: NoteElement;
  beatPosition: number;
}
interface BarProps extends FlexProps {
  bar: BarProcessed;
  selectedBeatPosition: number | null;
  selectedVoice: Voice | null;
  previewNoteSymbol: NoteSymbol | null;
  previewNoteOctave: NoteOctave | null;
}
function BarBlockComponent({
  bar: { barNumber, timeSignature, beats, timeSignatureChange },
  selectedBeatPosition,
  selectedVoice,
  previewNoteSymbol,
  previewNoteOctave,
  ...props
}: BarProps) {
  // console.log(`rerendering bar ${barNumber}`);
  return (
    <Flex
      id={getBarId(barNumber)}
      sx={{
        flexBasis: 0,
        flexGrow: 1,
        position: "relative",
        alignItems: "center",
        minWidth: "32px",
        justifyContent: "space-between",
        width: "100%",
      }}
      {...props}
    >
      <SheetStaffLines />
      <Flex sx={{ width: "100%" }}>
        {timeSignatureChange ? (
          <TimeSignatures timeSignature={timeSignature} />
        ) : null}
        <Flex sx={{ width: "100%" }}>
          {beats.map((beat) => {
            const beatSelected = selectedBeatPosition === beat.beatPosition;
            const selectedVoiceInBeat = beatSelected ? selectedVoice : null;
            const beatPreviewNoteSymbol = beatSelected
              ? previewNoteSymbol
              : null;
            const beatPreviewNoteOctave = beatSelected
              ? previewNoteOctave
              : null;
            return (
              <BeatBlock
                key={beat.beatPosition}
                barNumber={barNumber}
                beat={beat}
                selectedVoice={selectedVoiceInBeat}
                previewNoteSymbol={beatPreviewNoteSymbol}
                previewNoteOctave={beatPreviewNoteOctave}
              />
            );
          })}
        </Flex>
      </Flex>
      <Box
        sx={{
          height: `${sheetHeight}px`,
          width: "1px",
          borderRight: "1px solid",
          borderColor: "black",
        }}
      />
    </Flex>
  );
}

export const BarBlock = memo(BarBlockComponent);
