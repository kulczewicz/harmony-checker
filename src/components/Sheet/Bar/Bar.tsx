import { Box, BoxProps, Flex } from "theme-ui";
import {
  Bar,
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
} from "../../../types";
import { sheetHeight, SheetStaffLines } from "../Staff";
import { BassStaffVoices } from "./BassStaffVoices";
import { getBarId, getBeatId } from "./utils";
import { ViolinStaffVoices } from "./ViolinStaffVoices";

interface Beat {
  beatPosition: number;
  soprano?: ElementSoprano;
  alto?: ElementAlto;
  tenor?: ElementTenor;
  bass?: ElementBass;
}

interface BarProps extends Bar, BoxProps {}
export function BarBlock({ barNumber, beats, ...props }: BarProps) {
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
