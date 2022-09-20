import { Box, BoxProps } from "theme-ui";
import { sheetHeight, staffVerticalPadding } from "../../../constants";
import { SheetStaffLines } from "../Staff";

export function BarLine({ sx, ...props }: BoxProps) {
  return (
    <Box
      sx={{
        my: `${staffVerticalPadding}px`,
        height: `${sheetHeight}px`,
        width: "1px",
        backgroundColor: "black",
        ...sx,
      }}
      {...props}
    />
  );
}

export function EndBarLine({ sx, ...props }: BoxProps) {
  return (
    <Box sx={{ position: "relative", ...sx }} {...props}>
      <SheetStaffLines />
      <BarLine sx={{ ml: "4px", width: "4px" }} />
    </Box>
  );
}
