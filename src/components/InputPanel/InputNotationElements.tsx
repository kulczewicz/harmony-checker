import { useRecoilState, useRecoilValue } from "recoil";
import { Flex, ThemeUIStyleObject } from "theme-ui";
import { useUpdateBars } from "../../hooks";
import {
  barsState,
  defaultBarWithoutBarNumber,
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
import { SheetDataHandler } from "./SheetDataHandler";

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
  const [selectedBarNumber, setSelectedBarNumber] = useRecoilState(
    selectedBarNumberState
  );
  const [selectedBeatPosition, setSelectedBeatPosition] = useRecoilState(
    selectedBeatPositionState
  );
  const signatureSymbolsForNotes = useRecoilValue(
    signatureSymbolsForNotesInKeyState
  );
  const [bars, setBars] = useRecoilState(barsState);
  const { updateBars } = useUpdateBars();

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
      <Flex
        sx={{ ml: 2, flexDirection: "column", justifyContent: "space-between" }}
      >
        <InputPanelButton
          isActive={false}
          onClick={() => {
            if (selectedBarNumber === null || selectedBarNumber === undefined)
              return;

            setBars((bars) => {
              const newBarNumber = selectedBarNumber + 1;
              const barsBefore = bars.slice(0, newBarNumber);
              const barsAfter = bars
                .slice(newBarNumber)
                .map(({ barNumber, ...bar }) => ({
                  barNumber: barNumber + 1,
                  ...bar,
                }));
              console.log([
                ...barsBefore,
                { barNumber: newBarNumber, ...defaultBarWithoutBarNumber },
                ...barsAfter,
              ]);
              return [
                ...barsBefore,
                { barNumber: newBarNumber, ...defaultBarWithoutBarNumber },
                ...barsAfter,
              ];
            });
          }}
        >
          Add bar
        </InputPanelButton>
        <InputPanelButton
          isActive={false}
          onClick={() => {
            if (
              selectedBarNumber === null ||
              selectedBarNumber === undefined ||
              bars.length < 2
            )
              return;

            const barsBefore = bars.slice(0, selectedBarNumber);
            const barsAfter = bars
              .slice(selectedBarNumber + 1)
              .map(({ barNumber, ...bar }) => ({
                barNumber: barNumber - 1,
                ...bar,
              }));

            if (barsAfter.length === 0) {
              const newSelectedBarNumber = selectedBarNumber - 1;
              if (newSelectedBarNumber < 0) {
                return;
              }
              setSelectedBarNumber(newSelectedBarNumber);
            }
            setSelectedBeatPosition(0);
            setBars([...barsBefore, ...barsAfter]);
          }}
        >
          Remove bar
        </InputPanelButton>
      </Flex>
      <SheetDataHandler />
    </Flex>
  );
}
