import { Box, BoxProps } from "theme-ui";
import { BassKeySvg, ViolinKeySvg } from "../Notation";
import { Staff } from "./Staff";

function ViolinKey(props: BoxProps) {
  return (
    <Staff {...props}>
      <ViolinKeySvg height="84px" sx={{ mt: "26px", mx: 2 }} />
    </Staff>
  );
}

function BassKey(props: BoxProps) {
  return (
    <Staff {...props}>
      <BassKeySvg height="42px" sx={{ mt: "42px", mx: 2 }} />
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
