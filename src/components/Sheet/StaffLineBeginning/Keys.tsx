import { Box, BoxProps } from "theme-ui";
import { SheetStaffLines, StaffBox } from "../Staff";
import { BassKeySvg, ViolinKeySvg } from "./KeySvgs";

const keyElementWidth = 32;
const keyXMargin = 8;
export const keyWidth = keyElementWidth + keyXMargin;

function ViolinKey(props: BoxProps) {
  return (
    <StaffBox {...props}>
      <ViolinKeySvg
        width={`${keyElementWidth}px`}
        sx={{ mt: "26px", mx: `${keyXMargin}px` }}
      />
    </StaffBox>
  );
}

function BassKey(props: BoxProps) {
  return (
    <StaffBox {...props}>
      <BassKeySvg
        width={`${keyElementWidth}px`}
        sx={{ mt: "42px", mx: `${keyXMargin}px` }}
      />
    </StaffBox>
  );
}

export function Keys(props: BoxProps) {
  return (
    <Box sx={{ position: "relative", flex: "0 0 1" }} {...props}>
      <SheetStaffLines />
      <ViolinKey />
      <BassKey />
    </Box>
  );
}
