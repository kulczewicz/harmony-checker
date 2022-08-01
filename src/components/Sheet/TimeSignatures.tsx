import { Box, BoxProps } from "theme-ui";
import { Staff } from "./Staff";

function ViolinTimeSignature(props: BoxProps) {
  return <Staff {...props}></Staff>;
}

function BassTimeSignature(props: BoxProps) {
  return <Staff {...props}></Staff>;
}

export function TimeSignatures() {
  return (
    <Box>
      <Staff></Staff>
      <Staff></Staff>
    </Box>
  );
}
