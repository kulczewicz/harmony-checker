import { Box, BoxProps, Flex } from "theme-ui";
import { sheetHeight } from "../../../constants";
import { Bar, TimeSignature } from "../../../types";
import { getBarId, getBeatId } from "../../../utils";
import { SheetStaffLines, StaffBox } from "../Staff";
import { TimeSignatures } from "../TimeSignatures";
import { BassStaffVoices } from "./BassStaffVoices";
import { ViolinStaffVoices } from "./ViolinStaffVoices";

interface BarProps extends BoxProps {
  bar: Bar;
  previousBarTimeSignature: TimeSignature | undefined;
}
export function BarBlock({
  bar: { barNumber, timeSignature, beats },
  previousBarTimeSignature,
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
    >
      <SheetStaffLines />
      <Flex sx={{ width: "100%" }}>
        <TimeSignatures timeSignature={timeSignature} />
        <Flex sx={{ width: "100%" }}>
          {beats.map(({ beatPosition, soprano, alto, tenor, bass }) => (
            <Box
              sx={{ width: "100%" }}
              id={getBeatId(barNumber, beatPosition)}
              key={beatPosition}
              {...props}
            >
              <ViolinStaffVoices elementSoprano={soprano} elementAlto={alto} />
              <BassStaffVoices elementTenor={tenor} elementBass={bass} />
            </Box>
          ))}
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
