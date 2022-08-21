import { useRecoilState, useRecoilValue } from "recoil";
import { Flex } from "theme-ui";
import { inputOnState, inputVoiceState } from "../../NoteInputState";
import { Voice } from "../../types";
import { sheetHeight } from "../Sheet/Staff";
import { InputPanelButton } from "./InputPanelButton";

const voices: Voice[] = ["soprano", "alto", "tenor", "bass"];
export function InputVoices() {
  const isInputOn = useRecoilValue(inputOnState);
  const [inputVoice, setInputVoice] = useRecoilState(inputVoiceState);

  return (
    <Flex sx={{ alignItems: "center", mr: 4 }}>
      <Flex
        sx={{
          flexDirection: "column",
          height: `${sheetHeight}px`,
          justifyContent: "space-between",
        }}
      >
        {voices.map((voice) => (
          <InputPanelButton
            key={voice}
            isActive={inputVoice === voice && isInputOn}
            onClick={() => setInputVoice(voice)}
          >
            {voice.charAt(0).toLocaleUpperCase()}
          </InputPanelButton>
        ))}
      </Flex>
    </Flex>
  );
}
