import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { BoxProps, Flex } from "theme-ui";
import { barsState, defaultBarsState } from "../../NoteInputState";
import { InputPanelButton } from "./InputPanelButton";
import { saveAs } from "file-saver";

interface SheetDataHandlerProps extends BoxProps {}
export function SheetDataHandler({ ...props }: SheetDataHandlerProps) {
  const [fileToLoad, setFileToLoad] = useState<Blob | null>(null);
  const [bars, setBars] = useRecoilState(barsState);
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
      setBars(parsed);
    }
    setBarsFromFile();
  }, [fileToLoad, setBars]);

  return (
    <Flex
      sx={{ flexDirection: "column", justifyContent: "space-between", ml: 2 }}
      {...props}
    >
      <Flex>
        <InputPanelButton
          isActive={false}
          onClick={() => {
            const fileToSave = new Blob([JSON.stringify(bars)], {
              type: "application/json",
            });

            saveAs(fileToSave, "sheetData.json");
          }}
        >
          Save data
        </InputPanelButton>
        <InputPanelButton
          sx={{ ml: 2 }}
          isActive={false}
          onClick={() => {
            setBars(defaultBarsState);
            localStorage.removeItem("bars");
          }}
        >
          Reset data
        </InputPanelButton>
      </Flex>
      <input
        sx={{ maxWidth: "200px" }}
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
