import { Box, BoxProps, Flex } from "theme-ui";
import {
  noteHeadHight,
  staffVerticalPadding,
  staffWithPaddingHeight,
} from "../../constants";
import {
  KeySignatureSymbols,
  MusicKey,
  NotePitch,
  NoteSymbol,
} from "../../types";
import {
  adjustFlatPositionFromTop,
  adjustSharpPosition,
  calculateNotePositionFromTop,
} from "../../utils";
import { FlatAccidental, SharpAccidental } from "../Notation";
import { SheetStaffLines } from "./Staff";

const sharpKeySignatureNotesInOrder: NotePitch[] = [
  { noteSymbol: "F", octave: 5, accidental: null },
  { noteSymbol: "C", octave: 5, accidental: null },
  { noteSymbol: "G", octave: 5, accidental: null },
  { noteSymbol: "D", octave: 5, accidental: null },
  { noteSymbol: "A", octave: 4, accidental: null },
  { noteSymbol: "E", octave: 5, accidental: null },
  { noteSymbol: "B", octave: 4, accidental: null },
];
const flatKeySignatureNotesInOrder: NotePitch[] = [
  { noteSymbol: "B", octave: 4, accidental: null },
  { noteSymbol: "E", octave: 5, accidental: null },
  { noteSymbol: "A", octave: 4, accidental: null },
  { noteSymbol: "D", octave: 5, accidental: null },
  { noteSymbol: "G", octave: 4, accidental: null },
  { noteSymbol: "C", octave: 5, accidental: null },
  { noteSymbol: "F", octave: 4, accidental: null },
];

const sharpKeySignatureMarginsFromTop = sharpKeySignatureNotesInOrder.map(
  (pitch) =>
    adjustSharpPosition(
      calculateNotePositionFromTop({ pitch, voice: "soprano" })
    )
);

const flatKeySignatureMarginsFromTop = flatKeySignatureNotesInOrder.map(
  (pitch) =>
    adjustFlatPositionFromTop(
      calculateNotePositionFromTop({ pitch, voice: "soprano" })
    )
);

const keyMarginsTop = {
  sharp: sharpKeySignatureMarginsFromTop,
  flat: flatKeySignatureMarginsFromTop,
};
interface StaffKeySignatureProps extends BoxProps {
  type: "violin" | "bass";
  keySignatureSymbols: KeySignatureSymbols;
}
function StaffKeySignature({
  type,
  keySignatureSymbols: { signatureSymbol, numberOfSymbols },
  sx,
  ...props
}: StaffKeySignatureProps) {
  const allMarginsTop = keyMarginsTop[signatureSymbol];
  if (!allMarginsTop) return null;

  const marginsTop = allMarginsTop.slice(0, numberOfSymbols);

  const Accidental =
    signatureSymbol === "sharp" ? SharpAccidental : FlatAccidental;
  return (
    <Flex sx={{ ...sx, height: `${staffWithPaddingHeight}px` }} {...props}>
      {marginsTop.map((margin, index) => {
        const marginTop =
          type === "violin" ? `${margin}px` : `${margin + noteHeadHight}px`;
        return <Accidental key={index} sx={{ marginTop }} />;
      })}
    </Flex>
  );
}

interface KeySignatureProps {
  keySignatureSymbols: KeySignatureSymbols;
}
export function KeySignature({ keySignatureSymbols }: KeySignatureProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <SheetStaffLines />
      <StaffKeySignature
        type="violin"
        keySignatureSymbols={keySignatureSymbols}
      />
      <StaffKeySignature
        type="bass"
        keySignatureSymbols={keySignatureSymbols}
      />
    </Box>
  );
}
