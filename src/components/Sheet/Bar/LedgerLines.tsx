import { Box, BoxProps, Divider, SxProp } from "theme-ui";
import {
  distanceBetweenTheLines,
  noteHeadHight,
  noteHeadWidth,
  staffHeight,
  staffVerticalPadding,
  notePadding,
  ledgerLineOutsideWidth,
  noteZIndex,
} from "../../../constants";
import { CalculateNumberOfLedgerLinesReturn } from "../../../utils/calculateLedgerLines.utils";

interface LedgerLinesProps
  extends CalculateNumberOfLedgerLinesReturn,
    BoxProps {
  offsetFromLeft: number;
}
export function LedgerLines({
  numberOfLines,
  linesPosition,
  offsetFromLeft,
  ...props
}: LedgerLinesProps) {
  const offsetFromEdgeToEndOfStaff = staffVerticalPadding + staffHeight;
  const linesWidth = noteHeadWidth + ledgerLineOutsideWidth * 2;
  const sx: SxProp["sx"] = {
    position: "absolute",
    width: `${linesWidth}px`,
    left: `${offsetFromLeft - ledgerLineOutsideWidth}px`,
    height: `${noteHeadHight * numberOfLines}px`,
    zIndex: noteZIndex - 1,
    ...(linesPosition === "above"
      ? { bottom: `${offsetFromEdgeToEndOfStaff}px` }
      : { top: `${offsetFromEdgeToEndOfStaff}px` }),
  };
  const dividerSx: SxProp["sx"] =
    linesPosition === "above"
      ? {
          mb: `${distanceBetweenTheLines}px`,
          mt: 0,
        }
      : {
          mt: `${distanceBetweenTheLines}px`,
          mb: 0,
        };
  return (
    <Box sx={sx} {...props}>
      {new Array(numberOfLines).fill(0).map((_, index) => (
        <Divider key={index} sx={dividerSx} />
      ))}
    </Box>
  );
}
