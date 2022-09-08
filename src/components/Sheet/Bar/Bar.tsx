import { memo } from "react";
import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight } from "../../../constants";
import { BarProcessed, NoteElement, Voice } from "../../../types";
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
  // previewInputData: PreviewInputData | null;
  selectedBeatPosition: number | null;
  selectedVoice: Voice | null;
}
function BarBlockComponent({
  bar: { barNumber, timeSignature, beats, timeSignatureChange },
  // previewInputData,
  selectedBeatPosition,
  selectedVoice,
  ...props
}: BarProps) {
  console.log(`rerendering bar ${barNumber}`);
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
            // const beatPreviewElement =
            //   previewInputData?.beatPosition === beat.beatPosition
            //     ? previewInputData.element
            //     : null;
            const selectedVoiceInBeat = beatSelected ? selectedVoice : null;
            return (
              <BeatBlock
                key={beat.beatPosition}
                barNumber={barNumber}
                beat={beat}
                // previewElement={beatPreviewElement}
                selectedVoice={selectedVoiceInBeat}
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
