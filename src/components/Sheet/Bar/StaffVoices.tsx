import { StaffElements } from "../../../types";
import {
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "../../../utils";
import { StaffBox } from "../Staff";
import { StaffElement } from "./StaffElement";

export function StaffVoices({ ...staffElements }: StaffElements) {
  const { topElementFromBottom, bottomElementFromTop } =
    calculateStaffElementsVerticalPositions(staffElements);
  const { topElementLeftOffset, bottomElementLeftOffset } =
    calculateStaffElementsHorizontalPositions(staffElements);
  const { topElement, bottomElement } = staffElements;

  return (
    <StaffBox sx={{ width: "100%" }}>
      {topElement ? (
        <StaffElement
          direction="up"
          element={topElement}
          offsetFromBottom={topElementFromBottom}
          offsetFromLeft={topElementLeftOffset}
        />
      ) : null}
      {bottomElement ? (
        <StaffElement
          direction="down"
          element={bottomElement}
          offsetFromTop={bottomElementFromTop}
          offsetFromLeft={bottomElementLeftOffset}
        />
      ) : null}
    </StaffBox>
  );
}
