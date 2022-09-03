import { Box, BoxProps, Divider } from "theme-ui";
import {
  distanceBetweenTheLines,
  staffHeight,
  staffVerticalPadding,
  staffWithPaddingHeight,
} from "../../constants";

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

export interface StaffProps extends BoxProps {}
export function StaffBox({ children, sx, ...props }: StaffProps) {
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
