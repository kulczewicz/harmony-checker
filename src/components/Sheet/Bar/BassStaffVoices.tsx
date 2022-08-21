import { ElementBass, ElementTenor } from "../../../types";
import { wideNoteWidth } from "../../Notation";
import { Staff, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NotationElementLower, NotationElementUpper } from "./NoteElement";
import { calculateStaffElementsPositions } from "./utils";

interface BassStaffVoicesProps extends StaffProps {
  elementTenor?: ElementTenor;
  elementBass?: ElementBass;
}

export function BassStaffVoices({
  elementTenor,
  elementBass,
  ...props
}: BassStaffVoicesProps) {
  const { offsetFromBottom, offsetFromTop } = calculateStaffElementsPositions({
    upperElement: elementTenor,
    lowerElement: elementBass,
  });

  return (
    <Staff
      sx={{ width: `${wideNoteWidth + noteElementPadding * 2}px` }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${noteElementPadding}px`}
      {...props}
    >
      {elementTenor ? (
        <NotationElementUpper
          element={elementTenor}
          offsetFromBottom={offsetFromBottom}
        />
      ) : null}
      {elementBass ? (
        <NotationElementLower
          element={elementBass}
          offsetFromTop={offsetFromTop}
        />
      ) : null}
    </Staff>
  );
}
