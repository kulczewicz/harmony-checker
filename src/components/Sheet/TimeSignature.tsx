import { BoxProps, Flex } from "theme-ui";
import {
  barPadding,
  staffHeight,
  staffVerticalPadding,
  timeSignatureWidth,
} from "../../constants";
import { TimeSignature } from "../../types";
import { TimeSignatureNumberSvg } from "../Notation";

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
        width: `${timeSignatureWidth}px`,
        px: `${barPadding}px`,
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      <TimeSignatureStaff timeSignature={timeSignature} />
      <TimeSignatureStaff timeSignature={timeSignature} />
    </Flex>
  );
}
