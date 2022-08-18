import { Note } from "../../../types/data";
import { FullNote, SvgPropsThemeUi } from "../../Notation";
import { getNoteDownSvg, getNoteUpSvg } from "./utils";

interface NoteElementProps extends SvgPropsThemeUi {
  direction: "up" | "down";
  note: Note;
}
export function NoteElement({ direction, note, ...props }: NoteElementProps) {
  const { sx, ...baseProps } = props;
  const extendedProps: SvgPropsThemeUi = {
    sx: { position: "absolute", ...sx },
    ...baseProps,
  };
  if (note.duration >= 32) {
    return <FullNote {...extendedProps} />;
  }
  if (direction === "up") {
    return getNoteUpSvg(note.duration)(extendedProps);
  } else {
    return getNoteDownSvg(note.duration)(extendedProps);
  }
}
