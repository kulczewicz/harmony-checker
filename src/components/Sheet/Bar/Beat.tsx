import { memo, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Box, BoxProps } from "theme-ui";
import { useUpdateBars } from "../../../hooks";
import {
  inputDotOnState,
  inputElementTypeState,
  mouseOverBeatState,
  selectedAccidentalState,
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../../NoteInputState";
import type {
  BeatHarmonyError,
  BeatProcessed,
  NotationElement,
  NoteElement,
  NoteOctave,
  NoteSymbol,
  Voice,
} from "../../../types";
import { getBeatId } from "../../../utils";
import { getWidthIncreaseFactorForBeat } from "../../../utils/timeSignature.utils";
import { StaffVoices } from "./StaffVoices";

function getErrorObjectForBeat(errors: BeatHarmonyError[]) {
  const error = {
    errorMessages: [] as string[],
    soprano: false,
    alto: false,
    tenor: false,
    bass: false,
  };
  for (const { type, topVoice, bottomVoice } of errors) {
    error.errorMessages.push(type);
    error[topVoice] = true;
    error[bottomVoice] = true;
  }
  return error;
}

export type BeatInputElement = NotationElement | null;
interface BeatProps extends BoxProps {
  barNumber: number;
  beat: BeatProcessed;
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
  const inputDuration = useRecoilValue(inputElementTypeState);
  const selectedAccidental = useRecoilValue(selectedAccidentalState);
  const isDotOn = useRecoilValue(inputDotOnState);

  const { beatPosition, soprano, alto, tenor, bass, width, errors } = beat;
  const {
    errorMessages,
    soprano: sopranoCausingError,
    alto: altoCausingError,
    tenor: tenorCausingError,
    bass: bassCausingError,
  } = getErrorObjectForBeat(errors);

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
            accidental: selectedAccidental,
          },
          voice: previewVoice,
        }
      : null;

  const previewElementViolin =
    (previewVoice === "soprano" && soprano?.type === "rest") ||
    (previewVoice === "alto" && alto?.type === "rest")
      ? previewElement
      : null;
  const previewElementBass =
    (previewVoice === "tenor" && tenor?.type === "rest") ||
    (previewVoice === "bass" && bass?.type === "rest")
      ? previewElement
      : null;

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
        minWidth: width,
        ...sx,
      }}
      {...(selectedVoice
        ? {}
        : {
            onClick: () => {
              if (
                previewElement &&
                (previewElementViolin || previewElementBass)
              ) {
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
        topElementCausingError={sopranoCausingError}
        bottomElementCausingError={altoCausingError}
        selectedVoice={selectedVoice}
        previewElement={previewElementViolin}
        showPreviewAccidental={Boolean(selectedAccidental)}
      />
      <StaffVoices
        type="bass"
        barNumber={barNumber}
        beatPosition={beatPosition}
        topElement={tenor}
        bottomElement={bass}
        topElementCausingError={tenorCausingError}
        bottomElementCausingError={bassCausingError}
        selectedVoice={selectedVoice}
        previewElement={previewElementBass}
        showPreviewAccidental={Boolean(selectedAccidental)}
      />
    </Box>
  );
}

export const BeatBlock = memo(BeatComponent);
