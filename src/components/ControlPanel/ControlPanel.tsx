import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Button, Flex, Grid } from "theme-ui";
import { useBars } from "../../hooks";
import {
  inputVoiceState,
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../NoteInputState";
import { BarsInputPanel } from "./BarsInputPanel";
import { ArrowButtons } from "./ArrowButtons";
import { MusicKeyInput } from "./MusicKeyInput";
import { NotationElementsInput } from "./NotationElementsInput";
import { SaveToReadFromFile } from "./SaveToReadFromFile";

export function ControlPanel() {
  const [selectedBarNumber, setSelectedBarNumber] = useRecoilState(
    selectedBarNumberState
  );
  const [selectedBeatPosition, setSelectedBeatPosition] = useRecoilState(
    selectedBeatPositionState
  );
  const voice = useRecoilValue(inputVoiceState);
  const { bars, updateElementInBars } = useBars();

  return (
    <Flex sx={{ mb: "16px", flexWrap: "wrap" }}>
      <Box sx={{ mr: "8px" }}>
        <Flex sx={{ mb: "8px" }}>
          <MusicKeyInput sx={{ mr: "8px" }} />
          <BarsInputPanel
            selectedBarNumber={selectedBarNumber}
            setSelectedBarNumber={setSelectedBarNumber}
            setSelectedBeatPosition={setSelectedBeatPosition}
            sx={{ mr: "8px" }}
          />
          <SaveToReadFromFile />
        </Flex>
        <Flex>
          <NotationElementsInput
            selectedBarNumber={selectedBarNumber}
            selectedBeatPosition={selectedBeatPosition}
            selectedVoice={voice}
            bars={bars}
            updateElementInBars={updateElementInBars}
          />
        </Flex>
      </Box>
      <ArrowButtons
        bars={bars}
        selectedBarNumber={selectedBarNumber || 0}
        selectedBeatPosition={selectedBeatPosition || 0}
        setSelectedBarNumber={setSelectedBarNumber}
        setSelectedBeatPosition={setSelectedBeatPosition}
        selectedVoice={voice}
        updateElementInBars={updateElementInBars}
      />
    </Flex>
  );
}
