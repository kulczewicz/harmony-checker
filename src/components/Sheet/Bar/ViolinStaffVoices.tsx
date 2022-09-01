import { ElementAlto, ElementSoprano, NoteSymbolEnum } from "../../../types";
import { StaffBox, StaffProps } from "../Staff";
import { noteElementPadding } from "./constants";
import { NotationElementLower, NotationElementUpper } from "./NoteElement";
import {
  calculateStaffElementsHorizontalPositions,
  calculateStaffElementsVerticalPositions,
} from "./utils";

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
  const { topElementXPosition, bottomElementXPosition } =
    calculateStaffElementsHorizontalPositions({
      topElement: elementSoprano,
      bottomElement: elementAlto,
    });

  return (
    <StaffBox
      sx={{
        width: "100%",
        px: `${noteElementPadding}px`,
      }}
      staffLinesProps={{ sx: { left: "0px" } }}
      {...props}
    >
      {elementSoprano ? (
        <NotationElementUpper
          element={elementSoprano}
          offsetFromBottom={topElementFromBottom}
          offsetFromLeft={topElementXPosition}
        />
      ) : null}
      {elementAlto ? (
        <NotationElementLower
          element={elementAlto}
          offsetFromTop={bottomElementFromTop}
          offsetFromLeft={bottomElementXPosition}
        />
      ) : null}
    </StaffBox>
  );
}
