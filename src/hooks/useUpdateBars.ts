import { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { barsState } from "../NoteInputState";
import { SelectedElement } from "../types";

export function useUpdateBars() {
  const setBars = useSetRecoilState(barsState);
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

  return { updateBars };
}
