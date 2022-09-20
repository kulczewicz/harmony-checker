import { useRecoilState, useRecoilValue } from "recoil";
import { Box, Flex, ThemeUIStyleObject } from "theme-ui";
import { useBars } from "../../hooks";
import {
  barsState,
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
import { BarsInputPanel } from "./BarsInputPanel";
import { ControlPanelButton } from "./ControlPanelButton";
import { MusicKeyInput } from "./MusicKeyInput";
import { NotationElementsInput } from "./NotationElementsInput";
import { SaveToReadFromFile } from "./SaveToReadFromFile";
import { inputPanelSectionStyles } from "./styles";

const inputButtonStyle: ThemeUIStyleObject = {
  mr: 2,
  mt: 2,
};
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
