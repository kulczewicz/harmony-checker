import { SetterOrUpdater, useRecoilState, useRecoilValue } from "recoil";
import { Flex, FlexProps, ThemeUIStyleObject } from "theme-ui";
import { useBars } from "../../hooks";
import {
  inputElementValueState,
  inputVoiceState,
  selectedAccidentalState,
  signatureSymbolsForNotesInKeyState,
} from "../../NoteInputState";
import {
  Bar,
  DurationValue,
  NotationElement,
  NoteAccidental,
  SelectedElement,
  Voice,
} from "../../types";
import { getSignatureForNote } from "../../utils";
import { getSelectedElement } from "../../utils/getSelectedElement.utils";
import { AccidentalSvg, ElementNoteSvgUp, ElementRestSvg } from "../Notation";
import { ControlPanelButton } from "./ControlPanelButton";
import { inputPanelSectionStyles } from "./styles";

const inputButtonStyle: ThemeUIStyleObject = {
  p: "8px",
  display: "inline-flex",
  justifyContent: "center",
  width: "38px",
  height: "45px",
};
interface NotationElementsInputProps extends FlexProps {
  selectedBarNumber: number | null;
  selectedBeatPosition: number | null;
  selectedVoice: Voice;
  bars: Bar[];
  updateElementInBars: (newElement: SelectedElement) => void;
}
export function NotationElementsInput({
  selectedBarNumber,
  selectedBeatPosition,
  bars,
  updateElementInBars,
  selectedVoice,
}: NotationElementsInputProps) {
  const [inputDuration, setInputDuration] = useRecoilState(
    inputElementValueState
  );
  const [selectedAccidental, setSelectedAccidental] = useRecoilState(
    selectedAccidentalState
  );
  const signatureSymbolsForNotes = useRecoilValue(
    signatureSymbolsForNotesInKeyState
  );
  return (
    <Flex sx={{ ...inputPanelSectionStyles, flexWrap: "wrap" }}>
      {Object.entries(ElementNoteSvgUp).map(([duration, Note]) => (
        <ControlPanelButton
          key={duration}
          isActive={
            inputDuration.noteValue === duration &&
            inputDuration.type === "note"
          }
          sx={{ ...inputButtonStyle, alignItems: "flex-end" }}
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
                voice: selectedVoice,
              });

              if (selectedElement?.element.type === "note") {
                const newElement: NotationElement = {
                  ...selectedElement.element,
                  duration: {
                    ...selectedElement.element.duration,
                    value: newDurationNoteValue,
                  },
                };
                updateElementInBars({
                  ...selectedElement,
                  element: newElement,
                });
              }
            }
          }}
        >
          <Note sx={{ height: duration === "whole" ? "6px" : "30px" }} />
        </ControlPanelButton>
      ))}
      {Object.entries(ElementRestSvg).map(([duration, Rest]) => (
        <ControlPanelButton
          key={duration}
          isActive={
            inputDuration.noteValue === duration &&
            inputDuration.type === "rest"
          }
          sx={{ ...inputButtonStyle, alignItems: "center" }}
          onClick={() => {
            if (selectedBarNumber !== null && selectedBeatPosition !== null) {
              const selectedElement = getSelectedElement({
                bars,
                selectedBarNumber,
                selectedBeatPosition,
                voice: selectedVoice,
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
                updateElementInBars({
                  ...selectedElement,
                  element: newElement,
                });
              }
            } else {
              setInputDuration({
                noteValue: duration as DurationValue,
                type: "rest",
              });
            }
          }}
        >
          <Rest
            sx={{
              height:
                duration === "whole" || duration === "half" ? "10px" : "20px",
            }}
          />
        </ControlPanelButton>
      ))}
      {Object.entries(AccidentalSvg).map(([accidental, Accidental], index) => (
        <ControlPanelButton
          key={accidental}
          isActive={selectedAccidental === accidental}
          sx={{ ...inputButtonStyle, alignItems: "center" }}
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
              voice: selectedVoice,
            });

            if (selectedElement?.element.type == "note") {
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
              updateElementInBars({ ...selectedElement, element: newElement });
            }
            setSelectedAccidental(newAccidental);
          }}
        >
          <Accidental height="20px" />
        </ControlPanelButton>
      ))}
    </Flex>
  );
}
