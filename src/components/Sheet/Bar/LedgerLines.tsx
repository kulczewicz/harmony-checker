import { Box, BoxProps, Divider, SxProp } from "theme-ui";
import {
  distanceBetweenTheLines,
  noteHeadHight,
  noteHeadWidth,
  staffHeight,
  staffVerticalPadding,
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
  const linesWidth = noteHeadWidth * 2;
  const linesOffsetLeft = noteHeadWidth / 2;
  const sx: SxProp["sx"] = {
    position: "absolute",
    width: `${linesWidth}px`,
    left: `${offsetFromLeft - linesOffsetLeft}px`,
    height: `${noteHeadHight * numberOfLines}px`,
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
