import { Box, BoxProps } from "theme-ui";
import { Staff } from "./Staff";

function ViolinKeySignature(props: BoxProps) {
  return <Staff {...props}></Staff>;
}

function BassKeySignature(props: BoxProps) {
  return <Staff {...props}></Staff>;
}

export function KeySignatures() {
  return (
    <Box>
      <ViolinKeySignature />
      <BassKeySignature />
    </Box>
  );
}
