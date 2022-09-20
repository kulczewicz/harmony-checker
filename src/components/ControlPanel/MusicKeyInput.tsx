import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { Box, BoxProps, Flex, ThemeUIStyleObject } from "theme-ui";
import { musicKeyState } from "../../NoteInputState";
import { KeySignatureSymbol, MusicKeyMode, NoteSymbol } from "../../types";
import { inputPanelSectionStyles } from "./styles";

interface MusicKeyInputProps extends BoxProps {}

const existingMajorKeys: {
  [key in NoteSymbol]: (KeySignatureSymbol | null)[];
} = {
  C: [null, "sharp", "flat"],
  D: [null, "flat"],
  E: [null, "flat"],
  F: [null, "sharp"],
  G: [null, "flat"],
  A: [null, "flat"],
  B: [null, "flat"],
};
const existingMinorKeys: {
  [key in NoteSymbol]: (KeySignatureSymbol | null)[];
} = {
  A: [null, "sharp", "flat"],
  B: [null, "flat"],
  C: [null, "sharp"],
  D: [null, "sharp"],
  E: [null, "flat"],
  F: [null, "sharp"],
  G: [null, "sharp"],
};

type MusicKeyInputSignature = KeySignatureSymbol | "none";

function getSignatureSymbolForKeyword(signature: MusicKeyInputSignature) {
  if (signature === "flat") return "♭";
  if (signature === "sharp") return "♯";
  return "-";
}

const selectStyle: ThemeUIStyleObject = {
  p: "4px",
  fontSize: "16px",
  mr: "8px",
  mt: "8px",
  borderRadius: "4px",
};
export function MusicKeyInput({ sx, ...props }: MusicKeyInputProps) {
  const setMusicKey = useSetRecoilState(musicKeyState);
  const [keyMode, setKeyMode] = useState<MusicKeyMode>("major");
  const [musicKeyNote, setMusicKeyNote] = useState<NoteSymbol>("C");
  const [musicKeySignature, setMusicKeySignature] =
    useState<MusicKeyInputSignature>("none");
  const [availableKeySignatures, setAvailableKeySignatures] = useState<
    (KeySignatureSymbol | null)[]
  >(existingMajorKeys["C"]);

  useEffect(() => {
    const existingKeys =
      keyMode === "major" ? existingMajorKeys : existingMinorKeys;
    setAvailableKeySignatures(existingKeys[musicKeyNote]);
  }, [keyMode, musicKeyNote]);

  useEffect(() => {
    setMusicKey({
      mode: keyMode,
      note: musicKeyNote,
      signature: musicKeySignature === "none" ? null : musicKeySignature,
    });
  }, [keyMode, musicKeyNote, musicKeySignature, setMusicKey]);

  return (
    <Flex
      sx={{ ...inputPanelSectionStyles, ...sx, flexWrap: "wrap" }}
      {...props}
    >
      <select
        sx={selectStyle}
        name="note"
        value={musicKeyNote}
        onChange={({ target: { value } }) =>
          setMusicKeyNote(value as NoteSymbol)
        }
      >
        {(keyMode === "major"
          ? Object.keys(existingMajorKeys)
          : Object.keys(existingMinorKeys)
        ).map((noteSymbol) => (
          <option key={noteSymbol} value={noteSymbol}>
            {noteSymbol}
          </option>
        ))}
      </select>
      <select
        sx={selectStyle}
        name="signature"
        value={musicKeySignature}
        onChange={({ target: { value } }) =>
          setMusicKeySignature(value as MusicKeyInputSignature)
        }
      >
        {availableKeySignatures.map((signature) => {
          const optionSignature = signature === null ? "none" : signature;
          return (
            <option key={signature} value={optionSignature}>
              {getSignatureSymbolForKeyword(optionSignature)}
            </option>
          );
        })}
      </select>

      <select
        sx={{ ...selectStyle }}
        name="mode"
        value={keyMode}
        onChange={({ target: { value } }) => setKeyMode(value as MusicKeyMode)}
      >
        <option value="major">major</option>
        <option value="minor">minor</option>
      </select>
    </Flex>
  );
}
