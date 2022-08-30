import { Box, BoxProps } from "theme-ui";
import { StaffBox } from "./Staff";

function ViolinKeySignature(props: BoxProps) {
  return <StaffBox {...props}></StaffBox>;
}

function BassKeySignature(props: BoxProps) {
  return <StaffBox {...props}></StaffBox>;
}

export function KeySignatures() {
  return (
    <Box>
      <ViolinKeySignature />
      <BassKeySignature />
    </Box>
  );
}
