import { barPadding } from "../../../constants";
import { ElementBass, ElementTenor } from "../../../types";
import {
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "../../../utils";
import { StaffBox, StaffProps } from "../Staff";
import { NotationElement } from "./NoteElement";

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

  const { topElementLeftOffset, bottomElementLeftOffset } =
    calculateStaffElementsHorizontalPositions({
      topElement: elementTenor,
      bottomElement: elementBass,
    });

  return (
    <StaffBox sx={{ width: "100%" }} {...props}>
      {elementTenor ? (
        <NotationElement
          direction="up"
          element={elementTenor}
          offsetFromBottom={topElementFromBottom}
          offsetFromLeft={topElementLeftOffset}
        />
      ) : null}
      {elementBass ? (
        <NotationElement
          direction="down"
          element={elementBass}
          offsetFromTop={bottomElementFromTop}
          offsetFromLeft={bottomElementLeftOffset}
        />
      ) : null}
    </StaffBox>
  );
}
