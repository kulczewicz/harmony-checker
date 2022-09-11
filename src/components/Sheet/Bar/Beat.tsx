import { memo, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Box, BoxProps } from "theme-ui";
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
import { StaffVoices } from "./StaffVoices";

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: Beat;
  selectedVoice: Voice | null;
  previewNoteSymbol: NoteSymbol | null;
  previewNoteOctave: NoteOctave | null;
}
function BeatComponent({
  barNumber,
  beat: { beatPosition, soprano, alto, tenor, bass },
  selectedVoice,
  previewNoteOctave,
  previewNoteSymbol,
  ...props
}: BeatProps) {
  const setSelectedBarNumber = useSetRecoilState(selectedBarNumberState);
  const setSelectedBeatPosition = useSetRecoilState(selectedBeatPositionState);
  const [mouseOverBeat, setMouseOverBeat] = useRecoilState(mouseOverBeatState);
  const inputDuration = useRecoilValue(inputElementState);
  const isDotOn = useRecoilValue(inputDotOnState);

  const barHtmlElementId = getBeatId(barNumber, beatPosition);
  useEffect(() => {
    const beatElement = document.getElementById(
      getBeatId(barNumber, beatPosition)
    );
    const onBarMouseEnter = () => {
      setMouseOverBeat({ barNumber, beatPosition });
    };
    beatElement?.addEventListener("mouseenter", onBarMouseEnter);

    return () =>
      beatElement?.removeEventListener("mouseenter", onBarMouseEnter);
  }, [barHtmlElementId, barNumber, beatPosition, setMouseOverBeat]);

  const previewElement: NoteElement | null =
    previewNoteOctave && previewNoteSymbol && selectedVoice
      ? {
          type: "note",
          duration: {
            value: inputDuration.durationValue,
            dot: isDotOn,
          },
          pitch: {
            noteSymbol: previewNoteSymbol,
            octave: previewNoteOctave,
          },
          voice: selectedVoice,
        }
      : null;

  const mouseOver =
    mouseOverBeat?.barNumber === barNumber &&
    mouseOverBeat.beatPosition === beatPosition;
  const previewElementViolin =
    mouseOver && (selectedVoice === "soprano" || selectedVoice === "alto")
      ? previewElement
      : null;
  const previewElementBass =
    mouseOver && (selectedVoice === "tenor" || selectedVoice === "bass")
      ? previewElement
      : null;

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
