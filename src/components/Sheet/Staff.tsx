import { Box, BoxProps, Divider } from "theme-ui";

const distanceBetweenTheLines = 8;
const lineThickness = 1;
const staffHeight = 5 * lineThickness + 4 * distanceBetweenTheLines;
const staffVerticalPadding = 32;
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

interface Staff extends BoxProps {
  staffLinesProps?: BoxProps;
}
export function Staff({ children, sx, staffLinesProps, ...props }: Staff) {
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
