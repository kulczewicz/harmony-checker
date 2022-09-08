import { useCallback, useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import {
  barsState,
  inputDotOnState,
  inputElementState,
  inputVoiceState,
  selectedBarNumberState as selectedBarNumberState,
  selectedBeatPositionState,
} from "../NoteInputState";
import { NoteElement, NoteOctave, NoteSymbol, SelectedElement } from "../types";
import { getSelectedElement } from "../utils/getSelectedElement.utils";
import { onKeyDownAction } from "../utils/onKeyDownAction.utils";

interface PreviewElement {
  barNumber: number;
  data: {
    beatPosition: number;
    element: NoteElement;
  };
}

export function useCursor() {
  const [bars, setBars] = useRecoilState(barsState);
  const [offsetTop, setOffsetTop] = useState(0);
  const [previewBarNumber, setPreviewBarNumber] = useState<number>(0);
  const [previewBeatPosition, setPreviewBeatPosition] = useState<number>(0);
  const [previewNoteSymbol, setPreviewNoteSymbol] = useState<NoteSymbol | null>(
    null
  );
  const [previewNoteOctave, setPreviewNoteOctave] = useState<NoteOctave | null>(
    null
  );
  const [previewData, setPreviewData] = useState<PreviewElement | null>(null);
  const [inputDuration, setInputDuration] = useRecoilState(inputElementState);
  const [voice, setVoice] = useRecoilState(inputVoiceState);
  const [dotOn, setDotOn] = useRecoilState(inputDotOnState);

  const [selectedBarNumber, setSelectedBarNumber] = useRecoilState(
    selectedBarNumberState
  );
  const [selectedBeatPosition, setSelectedBeatPosition] = useRecoilState(
    selectedBeatPositionState
  );

  const updateBars = useCallback(
    (updatedElement: SelectedElement) => {
      setBars((bars) => {
        return bars.map((bar) => {
          if (bar.barNumber !== updatedElement.barNumber) return bar;

          const { beats, ...rest } = bar;
          const newBeats = beats.map((beat) => {
            if (beat.beatPosition !== updatedElement.beatPosition) return beat;

            return {
              ...beat,
              [updatedElement.element.voice]: updatedElement.element,
            };
          });
          return { ...rest, beats: newBeats };
        });
      });
    },
    [setBars]
  );

  useEffect(() => {
    if (selectedBarNumber === null || selectedBeatPosition === null) return;
    const selectedElement = getSelectedElement({
      bars,
      selectedBarNumber,
      selectedBeatPosition,
      voice,
    });
    if (!selectedElement) return;

    const onKeyDown = onKeyDownAction({
      bars,
      selectedElement,
      setSelectedBarNumber,
      setSelectedBeatPosition,
      updateBars,
    });
    document.addEventListener("keydown", onKeyDown);
    const removeKeyDownEventListeners = () => {
      document.removeEventListener("keydown", onKeyDown);
    };
    return removeKeyDownEventListeners;
  }, [
    bars,
    selectedBarNumber,
    setSelectedBarNumber,
    selectedBeatPosition,
    setSelectedBeatPosition,
    voice,
    updateBars,
  ]);

  // useEffect(() => {
  //   if (
  //     selectedElement?.barNumber === undefined ||
  //     selectedElement?.barNumber === null
  //   ) {
  //     return;
  //   }

  //   const barElement = document.getElementById(
  //     getBarId(selectedElement.barNumber)
  //   );
  //   if (!barElement) {
  //     return;
  //   }

  //   const updateOffset = (barElement: HTMLElement) => {
  //     const { top } = barElement.getBoundingClientRect();
  //     // console.log({ top });
  //     setOffsetTop(Math.round(top));
  //   };
  //   const onScroll = () => {
  //     updateOffset(barElement);
  //   };

  //   const addEventListenerOnScroll = () => addEventListener("scroll", onScroll);
  //   const removeEventListenerOnScroll = () =>
  //     addEventListener("scroll", onScroll);

  //   updateOffset(barElement);
  //   addEventListenerOnScroll();
  //   return removeEventListenerOnScroll;
  // }, [selectedElement?.barNumber, setOffsetTop]);

  // const onMouseMove = useCallback(
  //   (e: MouseEvent) => {
  //     const relativeYPosition = e.clientY - offsetTop;
  //     const note = getNotePitchByCursorPositon({
  //       yPosition: relativeYPosition,
  //       voice,
  //     });
  //     console.log({ relativeYPosition, note, offsetTop, voice });

  //     setPreviewNoteSymbol(note.noteSymbol);
  //     setPreviewNoteOctave(note.octave);
  //   },
  //   [setPreviewNoteSymbol, setPreviewNoteOctave, offsetTop, voice]
  // );

  // useEffect(() => {
  //   if (!previewNoteSymbol || !previewNoteOctave) {
  //     setPreviewData(null);
  //     return;
  //   }
  //   setPreviewData({
  //     barNumber: previewBarNumber,
  //     data: {
  //       beatPosition: previewBeatPosition,
  //       element: {
  //         type: "note",
  //         duration: {
  //           value: inputDuration.durationValue,
  //           dot: dotOn,
  //         },
  //         pitch: {
  //           noteSymbol: previewNoteSymbol,
  //           octave: previewNoteOctave,
  //         },
  //         voice,
  //       },
  //     },
  //   });
  // }, [
  //   previewNoteSymbol,
  //   previewNoteOctave,
  //   previewBeatPosition,
  //   inputDuration.durationValue,
  //   dotOn,
  //   voice,
  //   previewBarNumber,
  //   setPreviewData,
  // ]);

  // useEffect(() => {
  //   if (!selectedElement) return;

  //   const { barNumber, beatPosition, element } = selectedElement;
  //   setPreviewBarNumber(barNumber);
  //   setPreviewBeatPosition(beatPosition);
  //   const {
  //     type,
  //     duration: { value: durationValue, dot },
  //     voice,
  //   } = element;
  //   setVoice(voice);
  //   setInputDuration({ type, durationValue });
  //   if (dot) {
  //     setDotOn(true);
  //   }
  // }, [
  //   selectedElement,
  //   setVoice,
  //   setPreviewBarNumber,
  //   setPreviewBeatPosition,
  //   setInputDuration,
  //   setDotOn,
  // ]);

  // useEffect(() => {
  //   if (!selectedElement) return;

  //   const addEventListeners = () => {
  //     document.addEventListener("mousemove", onMouseMove);
  //   };
  //   const removeEventListeners = () => {
  //     document.removeEventListener("mousemove", onMouseMove);
  //   };
  //   const { barNumber, beatPosition } = selectedElement;

  //   const beatElement = document.getElementById(
  //     getBeatId(barNumber, beatPosition)
  //   );

  //   beatElement?.addEventListener("mouseenter", () => {
  //     addEventListeners();
  //   });

  //   beatElement?.addEventListener("mouseleave", () => {
  //     setPreviewData(null);
  //     removeEventListeners();
  //   });
  // }, [onMouseMove, setPreviewData, selectedElement]);

  // useEffect(() => {
  //   if (bars?.length === 0) return;

  //   const beatPositions = bars[previewBarNumber].beats.map(
  //     ({ beatPosition }) => beatPosition
  //   );
  //   beatPositions.forEach((beatPosition) => {
  //     const beatElement = document.getElementById(
  //       getBeatId(previewBarNumber, beatPosition)
  //     );
  //     beatElement?.addEventListener("mouseenter", () => {
  //       setPreviewBeatNumber(beatPosition);
  //     });
  //   });
  // }, [previewBarNumber, bars, setPreviewBeatNumber]);

  // useEffect(() => {
  //   const barNumbers = bars.map(({ barNumber }) => barNumber);
  //   barNumbers.forEach((barNumber) => {
  //     const barElement = document.getElementById(getBarId(barNumber));
  //     barElement?.addEventListener("mouseenter", () => {
  //       setPreviewBarNumber(barNumber);
  //     });
  //   });
  // }, [bars, setPreviewBarNumber]);

  return {
    selectedBarNumber,
    selectedBeatPosition,
    previewData,
  };
}
