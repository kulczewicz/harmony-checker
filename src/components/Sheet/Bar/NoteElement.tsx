import { Note } from "../../../types/data";
import { FullNote, SvgPropsThemeUi } from "../../Notation";
import { getNoteDownSvg, getNoteUpSvg } from "./utils";

interface NoteElementProps extends SvgPropsThemeUi {
  direction: "up" | "down";
  note: Note;
}
export function NoteElement({ direction, note, ...props }: NoteElementProps) {
  if (note.duration >= 32) {
    return <FullNote {...props} />;
  }
  if (direction === "up") {
    return getNoteUpSvg(note.duration)(props);
  }
  return getNoteDownSvg(note.duration)(props);
}
