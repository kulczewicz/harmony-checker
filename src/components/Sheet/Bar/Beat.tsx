import { Box, BoxProps } from "theme-ui";
import { Beat, NotationElement, NotePitch, Voice } from "../../../types";
import { getBeatId } from "../../../utils";
import { StaffVoices } from "./StaffVoices";

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: Beat;
  inputElement: NotationElement | null;
}
export function Beat({
  barNumber,
  beat: { beatPosition, soprano, alto, tenor, bass },
  inputElement,
  ...props
}: BeatProps) {
  return (
    <Box
      sx={{ width: "100%" }}
      id={getBeatId(barNumber, beatPosition)}
      key={beatPosition}
      {...props}
    >
      <StaffVoices topElement={soprano} bottomElement={alto} />
      <StaffVoices topElement={tenor} bottomElement={bass} />
    </Box>
  );
}
