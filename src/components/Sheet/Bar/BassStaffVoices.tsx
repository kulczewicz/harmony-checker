import { ElementBass, ElementTenor } from "../../../types";
import { StaffBox, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NotationElementLower, NotationElementUpper } from "./NoteElement";
import {
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "./utils";

interface BassStaffVoicesProps extends StaffProps {
  elementTenor?: ElementTenor;
  elementBass?: ElementBass;
}

export function BassStaffVoices({
  elementTenor,
  elementBass,
  ...props
}: BassStaffVoicesProps) {
  const { topElementFromBottom, bottomElementFromTop } =
    calculateStaffElementsVerticalPositions({
      topElement: elementTenor,
      bottomElement: elementBass,
    });

  const { topElementXPosition, bottomElementXPosition } =
    calculateStaffElementsHorizontalPositions({
      topElement: elementTenor,
      bottomElement: elementBass,
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
          offsetFromBottom={topElementFromBottom}
          offsetFromLeft={topElementXPosition}
        />
      ) : null}
      {elementBass ? (
        <NotationElementLower
          element={elementBass}
          offsetFromTop={bottomElementFromTop}
          offsetFromLeft={bottomElementXPosition}
        />
      ) : null}
    </StaffBox>
  );
}
