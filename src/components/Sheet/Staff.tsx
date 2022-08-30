import { Box, BoxProps, Divider } from "theme-ui";

export const distanceBetweenTheLines = 11;
export const lineThickness = 1;
export const noteHeadHight = distanceBetweenTheLines + lineThickness;
export const consecutiveNotesDistance = noteHeadHight / 2;
export const staffHeight = 5 * lineThickness + 4 * distanceBetweenTheLines;

export const notesInOctave = 7;
export const octaveNotesDistance = consecutiveNotesDistance * notesInOctave;
export const staffVerticalPadding = octaveNotesDistance;
export const staffWithPaddingHeight = staffHeight + 2 * staffVerticalPadding;
export const sheetHeight = staffHeight * 2 + staffVerticalPadding * 2;

export function StaffLines({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        height: `${staffHeight}px`,
        width: "100%",
        ...sx,
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

export function SheetStaffLines() {
  return (
    <>
      <StaffLines sx={{ top: `${staffVerticalPadding}px` }} />
      <StaffLines
        sx={{ top: `${staffWithPaddingHeight + staffVerticalPadding}px` }}
      />
    </>
  );
}

export interface StaffProps extends BoxProps {
  staffLinesProps?: BoxProps;
}
export function StaffBox({
  children,
  staffLinesProps,
  sx,
  ...props
}: StaffProps) {
  return (
    <Box
      sx={{
        position: "relative",
        height: `${staffWithPaddingHeight}px`,
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
}
