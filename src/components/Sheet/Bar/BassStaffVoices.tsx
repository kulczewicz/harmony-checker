import { NoteBass, NoteTenor } from "../../../types/data";
import { shortNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NoteElement } from "./NoteElement";

interface BassStaffVoicesProps extends StaffProps {
  noteTenor?: NoteTenor;
  noteBass?: NoteBass;
}
export function BassStaffVoices({
  noteTenor,
  noteBass,
  ...props
}: BassStaffVoicesProps) {
  return (
    <Staff
      sx={{ width: `${shortNoteWidth + noteElementPadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${noteElementPadding}px`}
      {...props}
    >
      {noteTenor ? <NoteElement direction="up" note={noteTenor} /> : null}
      {noteBass ? <NoteElement direction="down" note={noteBass} /> : null}
    </Staff>
  );
}
