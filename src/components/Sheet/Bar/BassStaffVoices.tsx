import { NoteBass, NoteTenor } from "../../../types/data";
import { shortNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NoteElement } from "./NoteElement";
import {
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
} from "./utils";

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
      {noteTenor ? (
        <NoteElement
          sx={{
            position: "absolute",
            bottom: calculateNotePositionFromBottom({
              ...noteTenor.pitch,
              voice: "tenor",
            }),
          }}
          direction="up"
          note={noteTenor}
        />
      ) : null}
      {noteBass ? (
        <NoteElement
          sx={{
            position: "absolute",
            top: calculateNotePositionFromTop({
              ...noteBass.pitch,
              voice: "bass",
            }),
          }}
          direction="down"
          note={noteBass}
        />
      ) : null}
    </Staff>
  );
}
