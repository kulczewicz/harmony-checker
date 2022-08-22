import { Box, BoxProps, Flex } from "theme-ui";
import {
  Bar,
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
} from "../../../types";
import { Cursor } from "../Cursor";
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

interface BarProps extends BoxProps {
  bar: Bar;
}
export function BarBlock({ bar: { barNumber, beats }, ...props }: BarProps) {
  return (
    <Flex id={getBarId(barNumber)}>
      {beats.map(({ beatPosition, soprano, alto, tenor, bass }) => (
        <Box
          id={getBeatId(barNumber, beatPosition)}
          key={beatPosition}
          {...props}
        >
          <ViolinStaffVoices elementSoprano={soprano} elementAlto={alto} />
          <BassStaffVoices elementTenor={tenor} elementBass={bass} />
        </Box>
      ))}
    </Flex>
  );
}
