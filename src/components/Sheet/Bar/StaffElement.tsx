import { noteZIndex } from "../../../constants";
import { NotationElement, SvgPropsThemeUi } from "../../../types";
import { calculateNumberOfLedgerLines } from "../../../utils/calculateLedgerLines.utils";
import {
  ElementNoteSvgUp,
  ElementRestSvg,
  ElementNoteSvgDown,
} from "../../Notation";
import { LedgerLines } from "./LedgerLines";
import { StaffElementPosition } from "./types";

interface StaffElementProps extends SvgPropsThemeUi {
  element: NotationElement;
  position: StaffElementPosition;
}
export function StaffElement({
  element,
  position,
  sx,
  ...props
}: StaffElementProps) {
  const extendedProps: SvgPropsThemeUi = {
    ...props,
    cursor: "pointer",
    sx: {
      ...sx,
      zIndex: noteZIndex,
      position: "absolute",
      left: `${position.offsetFromLeft}px`,
      ...(position.direction === "up"
        ? { bottom: `${position.offsetFromBottom}px` }
        : { top: `${position.offsetFromTop}px` }),
    },
  };

  const durationValue = element.duration.value;

  if (element.type === "note") {
    const { linesPosition, numberOfLines } =
      calculateNumberOfLedgerLines(element);
    const ElementNoteSvg =
      position.direction === "up" ? ElementNoteSvgUp : ElementNoteSvgDown;
    const Note = ElementNoteSvg[durationValue]({
      ...extendedProps,
    });
    if (linesPosition === "inside") {
      return Note;
    }
    return (
      <>
        {Note}
        <LedgerLines
          linesPosition={linesPosition}
          numberOfLines={numberOfLines}
          offsetFromLeft={position.offsetFromLeft}
        />
      </>
    );
  }
  return ElementRestSvg[durationValue]({ ...extendedProps });
}
