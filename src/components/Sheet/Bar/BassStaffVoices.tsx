import { ElementBass, ElementTenor } from "../../../types";
import { StaffBox, StaffProps } from "../Staff";
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
  const { upperElementFromBottom, lowerElementFromTop } =
    calculateStaffElementsPositions({
      upperElement: elementTenor,
      lowerElement: elementBass,
    });

  return (
    <StaffBox
      sx={{ width: "100%" }}
      staffLinesProps={{ sx: { left: "0px" } }}
      px={`${noteElementPadding}px`}
      {...props}
    >
      {elementTenor ? (
        <NotationElementUpper
          element={elementTenor}
          offsetFromBottom={upperElementFromBottom}
        />
      ) : null}
      {elementBass ? (
        <NotationElementLower
          element={elementBass}
          offsetFromTop={lowerElementFromTop}
        />
      ) : null}
    </StaffBox>
  );
}
