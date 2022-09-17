import { useRecoilState } from "recoil";
import { Flex, ThemeUIStyleObject } from "theme-ui";
import {
  inputDotOnState,
  inputElementTypeState,
  selectedAccidentalState,
} from "../../NoteInputState";
import { NoteAccidental, NoteValue } from "../../types";
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
              setInputDuration({
                noteValue: duration as NoteValue,
                type: "note",
              });
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
            onClick={() =>
              setInputDuration({
                noteValue: duration as NoteValue,
                type: "rest",
              })
            }
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
              if (selectedAccidental === accidental) {
                setSelectedAccidental(null);
              } else {
                setSelectedAccidental(accidental as NoteAccidental);
              }
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
