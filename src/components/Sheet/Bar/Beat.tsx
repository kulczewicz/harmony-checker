import { memo, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, BoxProps } from "theme-ui";
import {
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../../NoteInputState";
import type { Beat, NotationElement, Voice } from "../../../types";
import { getBeatId } from "../../../utils";
import { StaffVoices } from "./StaffVoices";

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: Beat;
  // previewElement: NoteElement | null;
  selectedVoice: Voice | null;
}
function BeatComponent({
  barNumber,
  beat: { beatPosition, soprano, alto, tenor, bass },
  // previewElement,
  selectedVoice,
  ...props
}: BeatProps) {
  const setSelectedBarNumber = useSetRecoilState(selectedBarNumberState);
  const setSelectedBeatPosition = useSetRecoilState(selectedBeatPositionState);
  // const previewViolinElement =
  //   voice === "soprano" || voice === "alto" ? previewElement : null;
  // const previewBassElement =
  //   voice === "tenor" || voice === "bass" ? previewElement : null;

  return (
    <Box
      key={beatPosition}
      id={getBeatId(barNumber, beatPosition)}
      sx={{
        width: "100%",
        backgroundColor: selectedVoice ? "lightskyblue" : "white",
        ":hover": selectedVoice
          ? {}
          : {
              backgroundColor: "lightgray",
              cursor: "pointer",
            },
      }}
      {...(selectedVoice
        ? {}
        : {
            onClick: () => {
              setSelectedBarNumber(barNumber);
              setSelectedBeatPosition(beatPosition);
            },
          })}
      {...props}
    >
      <StaffVoices
        type="violin"
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={soprano}
        bottomElement={alto}
        selectedVoice={selectedVoice}
      />
      <StaffVoices
        type="bass"
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={tenor}
        bottomElement={bass}
        selectedVoice={selectedVoice}
      />
    </Box>
  );
}

export const BeatBlock = memo(BeatComponent);
