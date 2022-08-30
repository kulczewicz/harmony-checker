import { Box, BoxProps } from "theme-ui";
import { StaffBox } from "./Staff";

function ViolinTimeSignature(props: BoxProps) {
  return <StaffBox {...props}></StaffBox>;
}

function BassTimeSignature(props: BoxProps) {
  return <StaffBox {...props}></StaffBox>;
}

export function TimeSignatures() {
  return (
    <Box>
      <StaffBox></StaffBox>
      <StaffBox></StaffBox>
    </Box>
  );
}
