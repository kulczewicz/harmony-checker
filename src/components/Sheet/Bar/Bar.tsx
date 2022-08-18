import { Box, BoxProps } from "theme-ui";
import {
  Bar,
  NoteAlto,
  NoteBass,
  NoteSoprano,
  NoteTenor,
} from "../../../types/data";
import { BassStaffVoices } from "./BassStaffVoices";
import { ViolinStaffVoices } from "./ViolinStaffVoices";

interface Beat {
  position: number;
  soprano?: NoteSoprano;
  alto?: NoteAlto;
  tenor?: NoteTenor;
  bass?: NoteBass;
}

interface BarProps extends BoxProps {
  bar: Bar;
}
export function BarBlock({ bar, ...props }: BarProps) {
  const {
    length,
    voices: { soprano, alto, tenor, bass },
  } = bar;
  const allBeats: Beat[] = Array.from({ length }, (_, position) => ({
    position,
  }));

  for (const note of soprano) {
    allBeats[note.position].soprano = note;
  }
  for (const note of alto) {
    allBeats[note.position].alto = note;
  }
  for (const note of tenor) {
    allBeats[note.position].tenor = note;
  }
  for (const note of bass) {
    allBeats[note.position].bass = note;
  }

  const beats = allBeats.filter(
    ({ soprano, alto, tenor, bass }) => soprano || alto || tenor || bass
  );

  return (
    <>
      {beats.map(({ position, soprano, alto, tenor, bass }) => (
        <Box key={position} {...props}>
          <ViolinStaffVoices noteSoprano={soprano} noteAlto={alto} />
          <BassStaffVoices noteTenor={tenor} noteBass={bass} />
        </Box>
      ))}
    </>
  );
}
