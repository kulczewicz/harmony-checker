import { Box, BoxProps, Flex } from "theme-ui";
import {
  noteHeadHight,
  staffVerticalPadding,
  staffWithPaddingHeight,
} from "../../constants";
import { KeySignature, MusicKey, NotePitch, NoteSymbol } from "../../types";
import { calculateNotePositionFromTop } from "../../utils";
import { getKeySignatureByMusicKey } from "../../utils/keySignatures.utils";
import { FlatAccidental, SharpAccidental } from "../Notation";

const sharpKeySignatureNotesInOrder: NotePitch[] = [
  { noteSymbol: "F", octave: 5 },
  { noteSymbol: "C", octave: 5 },
  { noteSymbol: "G", octave: 5 },
  { noteSymbol: "D", octave: 5 },
  { noteSymbol: "A", octave: 4 },
  { noteSymbol: "E", octave: 5 },
  { noteSymbol: "B", octave: 4 },
];
const flatKeySignatureNotesInOrder: NotePitch[] = [
  { noteSymbol: "B", octave: 4 },
  { noteSymbol: "E", octave: 5 },
  { noteSymbol: "A", octave: 4 },
  { noteSymbol: "D", octave: 5 },
  { noteSymbol: "G", octave: 4 },
  { noteSymbol: "C", octave: 5 },
  { noteSymbol: "F", octave: 4 },
];

const sharpKeySignatureMarginsFromTop = sharpKeySignatureNotesInOrder.map(
  (pitch) =>
    calculateNotePositionFromTop({ pitch, voice: "soprano" }) -
    noteHeadHight / 2
);

const flatKeySignatureMarginsFromTop = flatKeySignatureNotesInOrder.map(
  (pitch) => calculateNotePositionFromTop({ pitch, voice: "soprano" }) - 11
);

const keyMarginsTop = {
  sharp: sharpKeySignatureMarginsFromTop,
  flat: flatKeySignatureMarginsFromTop,
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

  const marginsTop = allMarginsTop.slice(0, numberOfSymbols);

  const Sign = signature === "sharp" ? SharpAccidental : FlatAccidental;
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
