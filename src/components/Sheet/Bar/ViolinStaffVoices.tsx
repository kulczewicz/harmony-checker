import { ElementAlto, ElementSoprano } from "../../../types";
import { wideNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NotationElementLower, NotationElementUpper } from "./NoteElement";
import { calculateStaffElementsPositions } from "./utils";

interface ViolinStaffVoicesProps extends StaffProps {
  elementSoprano?: ElementSoprano;
  elementAlto?: ElementAlto;
}

export function ViolinStaffVoices({
  elementSoprano,
  elementAlto,
  ...props
}: ViolinStaffVoicesProps) {
  const { offsetFromBottom, offsetFromTop } = calculateStaffElementsPositions({
    upperElement: elementSoprano,
    lowerElement: elementAlto,
  });

  return (
    <Staff
      sx={{ width: `${wideNoteWidth + noteElementPadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${noteElementPadding}px`}
      {...props}
    >
      {elementSoprano ? (
        <NotationElementUpper
          element={elementSoprano}
          offsetFromBottom={offsetFromBottom}
        />
      ) : null}
      {elementAlto ? (
        <NotationElementLower
          element={elementAlto}
          offsetFromTop={offsetFromTop}
        />
      ) : null}
    </Staff>
  );
}
