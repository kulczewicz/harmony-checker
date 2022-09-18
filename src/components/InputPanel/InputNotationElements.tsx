import { useRecoilState, useRecoilValue } from "recoil";
import { Flex, ThemeUIStyleObject } from "theme-ui";
import { useUpdateBars } from "../../hooks";
import {
  barsState,
  inputDotOnState,
  inputElementTypeState,
  inputVoiceState,
  selectedAccidentalState,
  selectedBarNumberState,
  selectedBeatPositionState,
  signatureSymbolsForNotesInKeyState,
} from "../../NoteInputState";
import { NotationElement, NoteAccidental, DurationValue } from "../../types";
import { getSignatureForNote } from "../../utils";
import { getSelectedElement } from "../../utils/getSelectedElement.utils";
import { AccidentalSvg, ElementNoteSvgUp, ElementRestSvg } from "../Notation";
import { InputPanelButton } from "./InputPanelButton";

const inputButtonStyle: ThemeUIStyleObject = {
  mr: 2,
  mt: 2,
};
export function InputNotationElements() {
  const [inputDuration, setInputDuration] = useRecoilState(
    inputElementTypeState
  );
  const [inputDotOn, setInputDotOn] = useRecoilState(inputDotOnState);
  const [selectedAccidental, setSelectedAccidental] = useRecoilState(
    selectedAccidentalState
  );
  const voice = useRecoilValue(inputVoiceState);
  const selectedBarNumber = useRecoilValue(selectedBarNumberState);
  const selectedBeatPosition = useRecoilValue(selectedBeatPositionState);
  const signatureSymbolsForNotes = useRecoilValue(
    signatureSymbolsForNotesInKeyState
  );
  const { bars, updateBars } = useUpdateBars();

  return (
    <Flex>
      <Flex
        sx={{
          border: "1px solid",
          borderColor: "orange",
          pl: 2,
          pb: 2,
          borderRadius: "4px",
          flexWrap: "wrap",
        }}
      >
        {Object.entries(ElementNoteSvgUp).map(([duration, Note]) => (
          <InputPanelButton
            key={duration}
            isActive={
              inputDuration.noteValue === duration &&
              inputDuration.type === "note"
            }
            sx={inputButtonStyle}
            onClick={() => {
              const newDurationNoteValue = duration as DurationValue;
              setInputDuration({
                noteValue: newDurationNoteValue,
                type: "note",
              });
              if (selectedBarNumber !== null && selectedBeatPosition !== null) {
                const selectedElement = getSelectedElement({
                  bars,
                  selectedBarNumber,
                  selectedBeatPosition,
                  voice,
                });

                if (selectedElement?.element.type === "note") {
                  const newElement: NotationElement = {
                    ...selectedElement.element,
                    duration: {
                      ...selectedElement.element.duration,
                      value: newDurationNoteValue,
                    },
                  };
                  updateBars({ ...selectedElement, element: newElement });
                }
              }
            }}
          >
            <Note height={duration === "whole" ? "5px" : "22px"} />
          </InputPanelButton>
        ))}
        {Object.entries(ElementRestSvg).map(([duration, Rest]) => (
          <InputPanelButton
            key={duration}
            isActive={
              inputDuration.noteValue === duration &&
              inputDuration.type === "rest"
            }
            sx={inputButtonStyle}
            onClick={() => {
              if (selectedBarNumber !== null && selectedBeatPosition !== null) {
                const selectedElement = getSelectedElement({
                  bars,
                  selectedBarNumber,
                  selectedBeatPosition,
                  voice,
                });

                if (selectedElement) {
                  const newDurationNoteValue = duration as DurationValue;
                  setInputDuration({
                    noteValue: newDurationNoteValue,
                    type: "rest",
                  });
                  const newElement: NotationElement = {
                    ...selectedElement.element,
                    type: "rest",
                    duration: {
                      ...selectedElement.element.duration,
                      value: newDurationNoteValue,
                    },
                  };
                  updateBars({ ...selectedElement, element: newElement });
                }
              } else {
                setInputDuration({
                  noteValue: duration as DurationValue,
                  type: "rest",
                });
              }
            }}
          >
            <Rest height="22px" />
          </InputPanelButton>
        ))}
        <InputPanelButton
          isActive={inputDotOn}
          onClick={() => setInputDotOn((currentDotOn) => !currentDotOn)}
          sx={inputButtonStyle}
        >
          .
        </InputPanelButton>
        {Object.entries(AccidentalSvg).map(([accidental, Accidental]) => (
          <InputPanelButton
            key={accidental}
            isActive={selectedAccidental === accidental}
            sx={inputButtonStyle}
            onClick={() => {
              let newAccidental: NoteAccidental | null;

              if (selectedAccidental === accidental) {
                newAccidental = null;
              } else {
                newAccidental = accidental as NoteAccidental;
              }

              if (selectedBarNumber === null || selectedBeatPosition === null) {
                setSelectedAccidental(newAccidental);
                return;
              }

              const selectedElement = getSelectedElement({
                bars,
                selectedBarNumber,
                selectedBeatPosition,
                voice,
              });

              if (selectedElement?.element.type == "note") {
                console.log("note");
                const newElement: NotationElement = {
                  ...selectedElement.element,
                  pitch: {
                    ...selectedElement.element.pitch,
                    accidental: newAccidental,
                  },
                };
                const { showAccidental } = getSignatureForNote(
                  newElement.pitch,
                  signatureSymbolsForNotes
                );
                if (!showAccidental && newAccidental !== null) {
                  return;
                }
                updateBars({ ...selectedElement, element: newElement });
              }
              setSelectedAccidental(newAccidental);
            }}
          >
            <Accidental height="22px" />
          </InputPanelButton>
        ))}
      </Flex>
      <InputPanelButton
        sx={{ ml: 2 }}
        isActive={false}
        onClick={() => console.log("TODO: add new bar")}
      >
        Add bar
      </InputPanelButton>
    </Flex>
  );
}
