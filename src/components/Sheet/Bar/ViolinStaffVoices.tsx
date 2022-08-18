import { NoteAlto, NoteSoprano } from "../../../types/data";
import { shortNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NoteElement } from "./NoteElement";

interface ViolinStaffVoicesProps extends StaffProps {
  noteSoprano?: NoteSoprano;
  noteAlto?: NoteAlto;
}

// function calculateSopranoPositionFromTheBottom() {}

export function ViolinStaffVoices({
  noteSoprano,
  noteAlto,
  ...props
}: ViolinStaffVoicesProps) {
  return (
    <Staff
      sx={{ width: `${shortNoteWidth + noteElementPadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${noteElementPadding}px`}
      {...props}
    >
      {noteSoprano ? (
        <NoteElement
          sx={{ bottom: "41px" }}
          direction="up"
          note={noteSoprano}
        />
      ) : null}
      {noteAlto ? <NoteElement direction="down" note={noteAlto} /> : null}
    </Staff>
  );
}
