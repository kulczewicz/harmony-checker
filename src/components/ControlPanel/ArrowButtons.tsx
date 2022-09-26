import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { Box, Flex, Grid } from "theme-ui";
import {
  previewNoteOctaveState,
  previewNoteSymbolState,
} from "../../NoteInputState";
import {
  Bar,
  NotationElement,
  NoteOctave,
  NoteSymbol,
  SelectedElement,
  Voice,
} from "../../types";
import { getSelectedElement } from "../../utils/getSelectedElement.utils";
import {
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onArrowUp,
  onDeleteNote,
} from "../../utils/keyboardActions.utils";
import {
  ControlPanelButton,
  controlPanelButtonHeight,
  controlPanelButtonWidth,
} from "./ControlPanelButton";

interface ControlButtonsProps {
  selectedBarNumber: number;
  selectedBeatPosition: number;
  selectedVoice: Voice;
  bars: Bar[];
  updateElementInBars: (updatedElement: SelectedElement) => void;
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
}

const arrowButtonStyles = {
  width: `${controlPanelButtonWidth}px`,
  height: `${controlPanelButtonHeight}px`,
  margin: 0,
};
const gridGap = 8;

export function ArrowButtons({
  bars,
  selectedBarNumber,
  selectedBeatPosition,
  selectedVoice,
  updateElementInBars,
  setSelectedBarNumber,
  setSelectedBeatPosition,
}: ControlButtonsProps) {
  const setPreviewNoteSymbol = useSetRecoilState(previewNoteSymbolState);
  const setPreviewNoteOctave = useSetRecoilState(previewNoteOctaveState);
  const selectedElement = getSelectedElement({
    bars,
    selectedBarNumber,
    selectedBeatPosition,
    voice: selectedVoice,
  });
  const resetPreviewNote = () => {
    setPreviewNoteSymbol(null);
    setPreviewNoteOctave(null);
  };

  return (
    <Flex
      sx={{
        mt: "8px",
        justifyContent: "end",
        flexDirection: "column",
      }}
    >
      <Grid
        sx={{
          ...arrowButtonStyles,
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, 1fr)",
          gap: `${gridGap}px`,
          width: `${controlPanelButtonWidth * 3 + gridGap * 2}px`,
          height: `${controlPanelButtonWidth * 2 + gridGap * 1}px`,
        }}
      >
        <ControlPanelButton
          sx={{
            ...arrowButtonStyles,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 1,
            gridRowEnd: 2,
          }}
          onClick={() =>
            onArrowUp({
              currentElement: selectedElement?.element,
              resetPreviewNote,
              selectedBarNumber,
              selectedBeatPosition,
              updateElementInBars,
            })
          }
        >
          &#9650;
        </ControlPanelButton>
        <ControlPanelButton
          sx={{
            ...arrowButtonStyles,
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 1,
            gridRowEnd: 2,
          }}
          onClick={() =>
            onDeleteNote({
              currentElement: selectedElement?.element,
              updateElementInBars,
              selectedBarNumber,
              selectedBeatPosition,
              resetPreviewNote,
            })
          }
        >
          &#9003;
        </ControlPanelButton>
        <ControlPanelButton
          sx={{
            ...arrowButtonStyles,
            gridColumnStart: 1,
            gridColumnEnd: 2,
            gridRowStart: 2,
            gridRowEnd: 3,
          }}
          onClick={() =>
            onArrowLeft({
              selectedBarNumber,
              selectedBeatPosition,
              setSelectedBarNumber,
              setSelectedBeatPosition,
              bars,
              resetPreviewNote,
            })
          }
        >
          &#9664;
        </ControlPanelButton>
        <ControlPanelButton
          sx={{
            ...arrowButtonStyles,
            gridColumnStart: 2,
            gridColumnEnd: 3,
            gridRowStart: 2,
            gridRowEnd: 3,
          }}
          onClick={() =>
            onArrowDown({
              currentElement: selectedElement?.element,
              resetPreviewNote,
              selectedBarNumber,
              selectedBeatPosition,
              updateElementInBars,
            })
          }
        >
          &#9660;
        </ControlPanelButton>
        <ControlPanelButton
          sx={{
            ...arrowButtonStyles,
            gridColumnStart: 3,
            gridColumnEnd: 4,
            gridRowStart: 2,
            gridRowEnd: 3,
          }}
          onClick={() =>
            onArrowRight({
              selectedBarNumber,
              selectedBeatPosition,
              setSelectedBarNumber,
              setSelectedBeatPosition,
              bars,
              resetPreviewNote,
            })
          }
        >
          &#9654;
        </ControlPanelButton>
      </Grid>
    </Flex>
  );
}
