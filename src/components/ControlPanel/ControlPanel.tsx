import { useRecoilState } from "recoil";
import { Box, Flex } from "theme-ui";
import {
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../NoteInputState";
import { BarsInputPanel } from "./BarsInputPanel";
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

  return (
    <Box sx={{ mb: "16px" }}>
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
        />
      </Flex>
    </Box>
  );
}
