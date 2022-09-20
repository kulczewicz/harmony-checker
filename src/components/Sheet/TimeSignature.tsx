import { BoxProps, Flex } from "theme-ui";
import {
  staffHeight,
  staffVerticalPadding,
  timeSignatureWidth,
} from "../../constants";
import { TimeSignature } from "../../types";
import { TimeSignatureNumberSvg } from "../Notation";
import { SheetStaffLines } from "./Staff";

interface TimeSignatureStaffProps extends BoxProps {
  timeSignature: TimeSignature;
}
function TimeSignatureStaff({
  timeSignature,
  ...props
}: TimeSignatureStaffProps) {
  return (
    <Flex
      sx={{
        my: `${staffVerticalPadding}px`,
        height: `${staffHeight}px`,
        flexDirection: "column",
      }}
      {...props}
    >
      {TimeSignatureNumberSvg[timeSignature.topNumber]({
        height: `${staffHeight / 2}px`,
      })}
      {TimeSignatureNumberSvg[timeSignature.bottomNumber]({
        height: `${staffHeight / 2}px`,
      })}
    </Flex>
  );
}

interface TimeSignatureProps extends BoxProps {
  timeSignature: TimeSignature;
}
export function TimeSignature({
  timeSignature,
  sx,
  ...props
}: TimeSignatureProps) {
  return (
    <Flex
      sx={{
        position: "relative",
        width: `${timeSignatureWidth}px`,
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      <SheetStaffLines />
      <TimeSignatureStaff timeSignature={timeSignature} />
      <TimeSignatureStaff timeSignature={timeSignature} />
    </Flex>
  );
}
