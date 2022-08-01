import { Box, BoxProps } from "theme-ui";
import {
  Bar,
  NoteAlto,
  NoteBass,
  NoteDuration,
  NoteSoprano,
  NoteTenor,
} from "../../types/data";
import {
  EighthsNoteDown,
  EighthsNoteUp,
  FullNote,
  HalfNoteDown,
  HalfNoteUp,
  QuarterNoteDown,
  QuarterNoteUp,
  shortNoteWidth,
  SixteenthNoteDown,
  SixteenthNoteUp,
  SvgPropsThemeUi,
  ThirtySecondNoteDown,
  ThirtySecondNoteUp,
} from "../Notation";
import { Staff } from "./Staff";

function getNoteUpSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteUp;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteUp;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteUp;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteUp;
  }
  return ThirtySecondNoteUp;
}

function getNoteDownSvg(duration: NoteDuration) {
  if (duration >= 16 && duration < 32) {
    return HalfNoteDown;
  }
  if (duration >= 8 && duration < 16) {
    return QuarterNoteDown;
  }
  if (duration >= 4 && duration < 8) {
    return EighthsNoteDown;
  }
  if (duration >= 2 && duration < 4) {
    return SixteenthNoteDown;
  }
  return ThirtySecondNoteDown;
}

function getNoteSvg(direction: "up" | "down", duration: NoteDuration) {
  if (duration >= 32) {
    return FullNote;
  }
  if (direction === "up") {
    return getNoteUpSvg(duration);
  } else {
    return getNoteDownSvg(duration);
  }
}

interface NoteElementProps extends SvgPropsThemeUi {
  direction: "up" | "down";
  note: NoteSoprano | NoteAlto | NoteTenor | NoteBass;
}
function NoteElement({ direction, note, ...props }: NoteElementProps) {
  if (note.duration >= 32) {
    return <FullNote {...props} />;
  }
  if (direction === "up") {
    return getNoteUpSvg(note.duration)(props);
  } else {
    return getNoteDownSvg(note.duration)(props);
  }
}

const notePadding = 4;
interface ViolinStaffVoicesProps extends BoxProps {
  noteSoprano?: NoteSoprano;
  noteAlto?: NoteAlto;
}
function ViolinStaffVoices({
  noteSoprano,
  noteAlto,
  ...props
}: ViolinStaffVoicesProps) {
  return (
    <Staff
      sx={{ width: `${shortNoteWidth + notePadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px="1"
      {...props}
    >
      {noteSoprano ? <NoteElement direction="up" note={noteSoprano} /> : null}
      {noteAlto ? <NoteElement direction="down" note={noteAlto} /> : null}
    </Staff>
  );
}

interface BassStaffVoicesProps extends BoxProps {
  noteTenor?: NoteTenor;
  noteBass?: NoteBass;
}
function BassStaffVoices({
  noteTenor,
  noteBass,
  ...props
}: BassStaffVoicesProps) {
  return (
    <Staff
      sx={{ width: `${shortNoteWidth + notePadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${notePadding}px`}
      {...props}
    >
      {noteTenor ? <NoteElement direction="up" note={noteTenor} /> : null}
      {noteBass ? <NoteElement direction="down" note={noteBass} /> : null}
    </Staff>
  );
}

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
