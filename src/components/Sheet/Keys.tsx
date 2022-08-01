import { Box, BoxProps } from "theme-ui";
import { BassKeySvg, ViolinKeySvg } from "../Notation";
import { Staff } from "./Staff";

function ViolinKey(props: BoxProps) {
  return (
    <Staff {...props}>
      <ViolinKeySvg height="60px" sx={{ mt: "22px", mx: 2 }} />
    </Staff>
  );
}

function BassKey(props: BoxProps) {
  return (
    <Staff {...props}>
      <BassKeySvg height="30px" sx={{ mt: "33px", mx: 2 }} />
    </Staff>
  );
}

export function Keys(props: BoxProps) {
  return (
    <Box>
      <ViolinKey />
      <BassKey />
    </Box>
  );
}
