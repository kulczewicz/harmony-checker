import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BoxProps, Flex } from "theme-ui";
import { barsState } from "../../NoteInputState";
import {
  ControlPanelButton,
  controlPanelButtonHeight,
} from "./ControlPanelButton";
import { saveAs } from "file-saver";
import { inputPanelSectionStyles } from "./styles";
import { useBars } from "../../hooks";

interface SheetDataHandlerProps extends BoxProps {}
export function SaveToReadFromFile({ sx, ...props }: SheetDataHandlerProps) {
  const [fileToLoad, setFileToLoad] = useState<Blob | null>(null);
  const { bars, updateBarsWithCache } = useBars();

  useEffect(() => {
    async function setBarsFromFile() {
      const jsonData = await fileToLoad?.text();
      if (!jsonData) return;
      let parsed;

      try {
        parsed = JSON.parse(jsonData);
      } catch {
        return;
      }
      // TODO: check if data is valid
      updateBarsWithCache(parsed);
    }
    setBarsFromFile();
  }, [fileToLoad, updateBarsWithCache]);

  return (
    <Flex sx={{ ...inputPanelSectionStyles, ...sx }} {...props}>
      <Flex>
        <ControlPanelButton
          sx={{ mr: 2 }}
          isActive={false}
          onClick={() => {
            const fileToSave = new Blob([JSON.stringify(bars)], {
              type: "application/json",
            });

            saveAs(fileToSave, "sheetData.json");
          }}
        >
          Save to file
        </ControlPanelButton>
      </Flex>
      <input
        sx={{ maxWidth: "200px", height: `${controlPanelButtonHeight}px` }}
        accept=".json"
        type="file"
        onChange={({ target: { files } }) => {
          if (!files?.item) return;

          const file = files[0];
          if (!file) return;
          setFileToLoad(file);
        }}
      />
    </Flex>
  );
}
