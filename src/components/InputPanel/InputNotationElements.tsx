import { useRecoilState } from "recoil";
import { Flex } from "theme-ui";
import { inputDotOnState, inputElementState } from "../../NoteInputState";
import { DurationValue } from "../../types";
import { ElementNoteSvgUp, ElementRestSvg } from "../Notation";
import { InputPanelButton } from "./InputPanelButton";

export function InputNotationElements() {
  const [inputDuration, setInputDuration] = useRecoilState(inputElementState);
  const [inputDotOn, setInputDotOn] = useRecoilState(inputDotOnState);

  return (
    <Flex>
      <Flex
        sx={{
          border: "1px solid",
          borderColor: "orange",
          p: 2,
          borderRadius: "4px",
        }}
      >
        {Object.entries(ElementNoteSvgUp).map(([duration, Note]) => (
          <InputPanelButton
            key={duration}
            isActive={
              inputDuration.durationValue === duration &&
              inputDuration.type === "note"
            }
            sx={{ mr: 2 }}
            onClick={() => {
              setInputDuration({
                durationValue: duration as DurationValue,
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
              inputDuration.durationValue === duration &&
              inputDuration.type === "rest"
            }
            sx={{ mr: 2 }}
            onClick={() =>
              setInputDuration({
                durationValue: duration as DurationValue,
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
        >
          .
        </InputPanelButton>
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
