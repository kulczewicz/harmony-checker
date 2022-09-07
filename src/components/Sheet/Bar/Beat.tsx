import { memo, useEffect } from "react";
import { Box, BoxProps } from "theme-ui";
import type { Beat, NotationElement, NoteElement } from "../../../types";
import { getBeatId } from "../../../utils";
import { StaffVoices } from "./StaffVoices";

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: Beat;
  previewElement: NoteElement | null;
  selectedElement: NotationElement | null;
}
function BeatComponent({
  barNumber,
  beat: { beatPosition, soprano, alto, tenor, bass },
  previewElement,
  selectedElement,
  ...props
}: BeatProps) {
  const { voice } = selectedElement || {};
  const selectedViolinElement =
    voice === "soprano" || voice === "alto" ? selectedElement : null;
  const selectedBassElement =
    voice === "tenor" || voice === "bass" ? selectedElement : null;
  const previewViolinElement =
    voice === "soprano" || voice === "alto" ? previewElement : null;
  const previewBassElement =
    voice === "tenor" || voice === "bass" ? previewElement : null;

  return (
    <Box
      sx={{ width: "100%" }}
      id={getBeatId(barNumber, beatPosition)}
      key={beatPosition}
      {...props}
    >
      <StaffVoices
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={soprano}
        bottomElement={alto}
        selectedElement={selectedViolinElement}
        previewElement={previewViolinElement}
      />
      <StaffVoices
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={tenor}
        bottomElement={bass}
        selectedElement={selectedBassElement}
        previewElement={previewBassElement}
      />
    </Box>
  );
}

export const BeatBlock = memo(BeatComponent);
