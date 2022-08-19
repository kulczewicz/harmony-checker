import { Box, BoxProps, Divider } from "theme-ui";

export const distanceBetweenTheLines = 9;
export const lineThickness = 1;
export const distanceBetweenConsecutiveNotes =
  (distanceBetweenTheLines + lineThickness) / 2;
export const staffHeight = 5 * lineThickness + 4 * distanceBetweenTheLines;
export const notesInOctave = 7;
export const distanceBetweenOctaveNotes =
  distanceBetweenConsecutiveNotes * notesInOctave;
export const staffVerticalPadding = distanceBetweenOctaveNotes;
function StaffLines(props: BoxProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: `${staffVerticalPadding}px`,
        height: `${staffHeight}px`,
        width: "100%",
      }}
      {...props}
    >
      <Divider mb={`${distanceBetweenTheLines}px`} mt={0} />
      <Divider mb={`${distanceBetweenTheLines}px`} mt={0} />
      <Divider mb={`${distanceBetweenTheLines}px`} mt={0} />
      <Divider mb={`${distanceBetweenTheLines}px`} mt={0} />
      <Divider mb={0} mt={0} />
    </Box>
  );
}

export interface StaffProps extends BoxProps {
  staffLinesProps?: BoxProps;
}
export function Staff({ children, sx, staffLinesProps, ...props }: StaffProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: `${staffHeight + 2 * staffVerticalPadding}px`,
        ...sx,
      }}
      {...props}
    >
      <StaffLines {...staffLinesProps} />
      {children}
    </Box>
  );
}
