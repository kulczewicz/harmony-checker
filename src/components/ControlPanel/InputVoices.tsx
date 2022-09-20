import { useRecoilState, useSetRecoilState } from "recoil";
import { Box, Flex, FlexProps } from "theme-ui";
import { sheetHeight, staffVerticalPadding } from "../../constants";
import { inputVoiceState } from "../../NoteInputState";
import { Voice } from "../../types";
import { ControlPanelButton } from "./ControlPanelButton";

export const inputVoicesRightMargin = 16;
const voices: Voice[] = ["soprano", "alto", "tenor", "bass"];
export function InputVoices({ sx, ...props }: FlexProps) {
  const [inputVoice, setInputVoice] = useRecoilState(inputVoiceState);

  return (
    <Flex
      sx={{
        ...sx,
        position: "relative",
        top: `${staffVerticalPadding}px`,
        flexDirection: "column",
        height: `${sheetHeight}px`,
        justifyContent: "space-between",
        mr: `${inputVoicesRightMargin}px`,
      }}
    >
      {voices.map((voice) => (
        <ControlPanelButton
          key={voice}
          isActive={inputVoice === voice}
          onClick={() => {
            setInputVoice(voice);
          }}
        >
          {voice.charAt(0).toLocaleUpperCase()}
        </ControlPanelButton>
      ))}
    </Flex>
  );
}
