import { Box, BoxProps, Flex } from "theme-ui";
import {
  noteHeadHight,
  staffVerticalPadding,
  staffWithPaddingHeight,
} from "../../constants";
import {
  KeySignature,
  KeySignatureSymbol,
  MusicKey,
  SvgPropsThemeUi,
} from "../../types";
import { getKeySignatureByMusicKey } from "../../utils/keySignatures.utils";
import { FlatSign, SharpSign } from "../Notation";
import { StaffBox } from "./Staff";

const keyMarginsTopSharp = [
  staffVerticalPadding - noteHeadHight,
  staffVerticalPadding + noteHeadHight * 0.5,
  staffVerticalPadding - noteHeadHight * 1.5,
  staffVerticalPadding,
  staffVerticalPadding + noteHeadHight * 1.5,
  staffVerticalPadding - noteHeadHight * 0.5,
  staffVerticalPadding + noteHeadHight,
];
const keyMarginsTopFlat = [
  staffVerticalPadding + 8,
  staffVerticalPadding - 11,
  staffVerticalPadding + 13,
  staffVerticalPadding - 5,
  staffVerticalPadding + 19,
  staffVerticalPadding + 1,
  staffVerticalPadding + 25,
];

const keyMarginsTop = {
  sharp: keyMarginsTopSharp,
  flat: keyMarginsTopFlat,
};
interface StaffKeySignature extends BoxProps {
  type: "violin" | "bass";
  keySignature: KeySignature;
}
function KeySignature({
  type,
  keySignature: { signature, numberOfSymbols },
  sx,
  ...props
}: StaffKeySignature) {
  const allMarginsTop = keyMarginsTop[signature];
  if (!allMarginsTop) return null;

  // const marginsTop = allMarginsTop.slice(0, numberOfSymbols);
  const marginsTop = allMarginsTop;

  const Sign = signature === "sharp" ? SharpSign : FlatSign;
  return (
    <Flex sx={{ ...sx, height: `${staffWithPaddingHeight}px` }} {...props}>
      {marginsTop.map((margin, index) => {
        const marginTop =
          type === "violin" ? `${margin}px` : `${margin + noteHeadHight}px`;
        return <Sign key={index} sx={{ marginTop }} />;
      })}
    </Flex>
  );
}

interface KeySignaturesProps {
  musicKey: MusicKey;
}
export function KeySignatures({ musicKey }: KeySignaturesProps) {
  const keySignature = getKeySignatureByMusicKey(musicKey);
  if (keySignature === null) return null;

  return (
    <Box>
      <KeySignature type="violin" keySignature={keySignature} />
      <KeySignature type="bass" keySignature={keySignature} />
    </Box>
  );
}
