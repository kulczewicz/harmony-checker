import { memo, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, BoxProps } from "theme-ui";
import { useUpdateBars } from "../../../hooks";
import {
  inputDotOnState,
  inputElementState,
  mouseOverBeatState,
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../../NoteInputState";
import type {
  Beat,
  NotationElement,
  NoteElement,
  NoteOctave,
  NoteSymbol,
  Voice,
} from "../../../types";
import { getBeatId } from "../../../utils";
import { getWidthIncreaseFactorForBeat } from "../../../utils/timeSignature.utils";
import { StaffVoices } from "./StaffVoices";

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: Beat;
  selectedVoice: Voice | null;
  previewVoice: Voice | null;
  previewNoteSymbol: NoteSymbol | null;
  previewNoteOctave: NoteOctave | null;
}
function BeatComponent({
  barNumber,
  beat,
  selectedVoice,
  previewNoteOctave,
  previewNoteSymbol,
  previewVoice,
  sx,
  ...props
}: BeatProps) {
  const { updateBars } = useUpdateBars();
  const setSelectedBarNumber = useSetRecoilState(selectedBarNumberState);
  const setSelectedBeatPosition = useSetRecoilState(selectedBeatPositionState);
  const setMouseOverBeat = useSetRecoilState(mouseOverBeatState);
  const inputDuration = useRecoilValue(inputElementState);
  const isDotOn = useRecoilValue(inputDotOnState);

  const { beatPosition, soprano, alto, tenor, bass } = beat;
  console.log({ beatPosition });
  const barHtmlElementId = getBeatId(barNumber, beatPosition);
  useEffect(() => {
    const beatElement = document.getElementById(
      getBeatId(barNumber, beatPosition)
    );
    const onBeatMouseEnter = () => {
      setMouseOverBeat({ barNumber, beatPosition });
    };
    const onBeatMouseLeave = () => {
      setMouseOverBeat(null);
    };
    beatElement?.addEventListener("mouseenter", onBeatMouseEnter);
    beatElement?.addEventListener("mouseleave", onBeatMouseLeave);

    return () => {
      beatElement?.removeEventListener("mouseenter", onBeatMouseEnter);
      beatElement?.addEventListener("mouseleave", onBeatMouseLeave);
    };
  }, [barHtmlElementId, barNumber, beatPosition, setMouseOverBeat]);

  const previewElement: NoteElement | null =
    previewNoteOctave && previewNoteSymbol && previewVoice
      ? {
          type: "note",
          duration: {
            value: inputDuration.noteValue,
            dot: isDotOn,
          },
          pitch: {
            noteSymbol: previewNoteSymbol,
            octave: previewNoteOctave,
          },
          voice: previewVoice,
        }
      : null;

  const previewElementViolin =
    previewVoice === "soprano" || previewVoice === "alto"
      ? previewElement
      : null;
  const previewElementBass =
    previewVoice === "tenor" || previewVoice === "bass" ? previewElement : null;

  const widthIncreaseFactor = getWidthIncreaseFactorForBeat(beat);
  return (
    <Box
      key={beatPosition}
      id={getBeatId(barNumber, beatPosition)}
      sx={{
        flexBasis: 0,
        flexGrow: widthIncreaseFactor,
        backgroundColor: selectedVoice ? "lightskyblue" : "white",
        ":hover": selectedVoice
          ? {}
          : {
              backgroundColor: "lightgray",
              cursor: "pointer",
            },
        ...sx,
      }}
      {...(selectedVoice
        ? {}
        : {
            onClick: () => {
              if (previewElement) {
                updateBars({
                  barNumber,
                  beatPosition,
                  element: previewElement,
                });
              }
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
        previewElement={previewElementViolin}
      />
      <StaffVoices
        type="bass"
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={tenor}
        bottomElement={bass}
        selectedVoice={selectedVoice}
        previewElement={previewElementBass}
      />
    </Box>
  );
}

export const BeatBlock = memo(BeatComponent);
