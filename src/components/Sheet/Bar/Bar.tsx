import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight } from "../../../constants";
import { BarProcessed, NotationElement, TimeSignature } from "../../../types";
import { getBarId } from "../../../utils";
import { SheetStaffLines } from "../Staff";
import { TimeSignatures } from "../TimeSignatures";
import { Beat } from "./Beat";

export interface BarInputData {
  currentInputElement: NotationElement;
  currentBeat: number;
}
interface BarProps extends FlexProps {
  bar: BarProcessed;
  previousBarTimeSignature: TimeSignature | undefined;
  inputData: BarInputData | null;
}
export function BarBlock({
  bar: { barNumber, timeSignature, beats, timeSignatureChange },
  previousBarTimeSignature,
  inputData,
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
            const beatInputElement =
              inputData?.currentBeat === beat.beatPosition
                ? inputData.currentInputElement
                : null;
            return (
              <Beat
                key={beat.beatPosition}
                barNumber={barNumber}
                beat={beat}
                inputElement={beatInputElement}
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
