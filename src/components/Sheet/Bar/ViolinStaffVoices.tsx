import { NoteAlto, NoteSoprano } from "../../../types/data";
import { shortNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NoteElement } from "./NoteElement";
import {
  calculateNotePositionFromBottom,
  calculateNotePositionFromTop,
} from "./utils";

interface ViolinStaffVoicesProps extends StaffProps {
  noteSoprano?: NoteSoprano;
  noteAlto?: NoteAlto;
}

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
          sx={{
            position: "absolute",
            bottom: calculateNotePositionFromBottom({
              ...noteSoprano.pitch,
              voice: "soprano",
            }),
          }}
          direction="up"
          note={noteSoprano}
        />
      ) : null}
      {noteAlto ? (
        <NoteElement
          sx={{
            position: "absolute",
            top: calculateNotePositionFromTop({
              ...noteAlto.pitch,
              voice: "alto",
            }),
          }}
          direction="down"
          note={noteAlto}
        />
      ) : null}
    </Staff>
  );
}
