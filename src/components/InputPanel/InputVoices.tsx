import { useRecoilState, useSetRecoilState } from "recoil";
import { Flex } from "theme-ui";
import { sheetHeight } from "../../constants";
import { inputVoiceState, selectedElementState } from "../../NoteInputState";
import { Voice } from "../../types";
import { InputPanelButton } from "./InputPanelButton";

const voices: Voice[] = ["soprano", "alto", "tenor", "bass"];
export function InputVoices() {
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
            isActive={inputVoice === voice}
            onClick={() => {
              setInputVoice(voice);
            }}
          >
            {voice.charAt(0).toLocaleUpperCase()}
          </InputPanelButton>
        ))}
      </Flex>
    </Flex>
  );
}
