import { memo, useEffect } from "react";
import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight } from "../../../constants";
import {
  BarProcessed,
  NotationElement,
  NoteElement,
  TimeSignature,
} from "../../../types";
import { getBarId } from "../../../utils";
import { SheetStaffLines } from "../Staff";
import { TimeSignatures } from "../TimeSignatures";
import { BeatBlock } from "./Beat";

export interface SelectedInputData {
  element: NotationElement;
  beatPosition: number;
}
export interface PreviewInputData {
  element: NoteElement;
  beatPosition: number;
}
interface BarProps extends FlexProps {
  bar: BarProcessed;
  previewInputData: PreviewInputData | null;
  selectedInputData: SelectedInputData | null;
}
function BarBlockComponent({
  bar: { barNumber, timeSignature, beats, timeSignatureChange },
  previewInputData,
  selectedInputData,
  ...props
}: BarProps) {
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
            const beatPreviewElement =
              previewInputData?.beatPosition === beat.beatPosition
                ? previewInputData.element
                : null;
            const beatSelectedElement =
              selectedInputData?.beatPosition === beat.beatPosition
                ? selectedInputData.element
                : null;
            return (
              <BeatBlock
                key={beat.beatPosition}
                barNumber={barNumber}
                beat={beat}
                previewElement={beatPreviewElement}
                selectedElement={beatSelectedElement}
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
