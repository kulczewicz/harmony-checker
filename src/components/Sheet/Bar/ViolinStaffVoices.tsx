import { barPadding } from "../../../constants";
import { ElementAlto, ElementSoprano, NoteSymbolEnum } from "../../../types";
import {
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "../../../utils";
import { StaffBox, StaffProps } from "../Staff";
import { NotationElement } from "./NoteElement";

interface ViolinStaffVoicesProps extends StaffProps {
  elementSoprano?: ElementSoprano;
  elementAlto?: ElementAlto;
}

export function ViolinStaffVoices({
  elementSoprano,
  elementAlto,
  ...props
}: ViolinStaffVoicesProps) {
  const { topElementFromBottom, bottomElementFromTop } =
    calculateStaffElementsVerticalPositions({
      topElement: elementSoprano,
      bottomElement: elementAlto,
    });
  const { topElementLeftOffset, bottomElementLeftOffset } =
    calculateStaffElementsHorizontalPositions({
      topElement: elementSoprano,
      bottomElement: elementAlto,
    });

  return (
    <StaffBox
      sx={{
        width: "100%",
        px: `${barPadding}px`,
      }}
      {...props}
    >
      {elementSoprano ? (
        <NotationElement
          direction="up"
          element={elementSoprano}
          offsetFromBottom={topElementFromBottom}
          offsetFromLeft={topElementLeftOffset}
        />
      ) : null}
      {elementAlto ? (
        <NotationElement
          direction="down"
          element={elementAlto}
          offsetFromTop={bottomElementFromTop}
          offsetFromLeft={bottomElementLeftOffset}
        />
      ) : null}
    </StaffBox>
  );
}
