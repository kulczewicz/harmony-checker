import { noteZIndex } from "../../../constants";
import {
  NotationElement,
  NotationElementProcessed,
  NoteAccidental,
  SvgPropsThemeUi,
} from "../../../types";
import { adjustFlatPositionFromTop, adjustSharpPosition } from "../../../utils";
import { calculateNumberOfLedgerLines } from "../../../utils/calculateLedgerLines.utils";
import {
  ElementNoteSvgUp,
  ElementRestSvg,
  ElementNoteSvgDown,
  AccidentalSvg,
} from "../../Notation";
import { LedgerLines } from "./LedgerLines";
import { StaffElementPosition } from "./types";

interface StaffElementProps extends SvgPropsThemeUi {
  element: NotationElement;
  position: StaffElementPosition;
}
function StaffElement({ element, position, sx, ...props }: StaffElementProps) {
  const extendedProps: SvgPropsThemeUi = {
    ...props,
    cursor: "pointer",
    sx: {
      zIndex: noteZIndex,
      position: "absolute",
      left: `${position.offsetFromLeft}px`,
      ...(position.direction === "up"
        ? { bottom: `${position.offsetFromBottom}px` }
        : { top: `${position.offsetFromTop}px` }),
      ...sx,
    },
  };

  const noteValue = element.duration.value;

  if (element.type === "note") {
    const { linesPosition, numberOfLines } =
      calculateNumberOfLedgerLines(element);
    const ElementNoteSvg =
      position.direction === "up" ? ElementNoteSvgUp : ElementNoteSvgDown;
    const Note = ElementNoteSvg[noteValue]({
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
  return ElementRestSvg[noteValue]({ ...extendedProps });
}

interface StaffAccidentalProps extends SvgPropsThemeUi {
  position: StaffElementPosition;
  accidental: NoteAccidental;
  isSelected: boolean;
}
function StaffAccidental({
  position,
  accidental,
  isSelected,
  sx,
  ...props
}: StaffAccidentalProps) {
  const extendedSx: SvgPropsThemeUi["sx"] = {
    position: "absolute",
    left: `${position.accidentalOffsetFromLeft}px`,
    ...(position.direction === "up"
      ? {
          bottom: `${
            accidental !== "flat"
              ? adjustSharpPosition(position.offsetFromBottom)
              : position.offsetFromBottom
          }px`,
        }
      : {
          top: `${
            accidental === "flat"
              ? adjustFlatPositionFromTop(position.offsetFromTop)
              : adjustSharpPosition(position.offsetFromTop)
          }px`,
        }),
    fill: isSelected ? "blue" : "black",
    ...sx,
  };
  return AccidentalSvg[accidental]({ ...props, sx: extendedSx });
}

interface StaffElementWithAccidentalProps {
  element: NotationElement;
  showAccidental: boolean;
  position: StaffElementPosition;
  isSelected: boolean;
  setSelected: () => void;
}
export function StaffElementWithAccidental({
  element,
  showAccidental,
  position,
  isSelected,
  setSelected,
}: StaffElementWithAccidentalProps) {
  return (
    <>
      <StaffElement
        position={position}
        element={element}
        onClick={setSelected}
        sx={{ fill: isSelected ? "blue" : "black" }}
      />
      {element.type === "note" &&
      showAccidental &&
      element.pitch.accidental &&
      position.accidentalOffsetFromLeft ? (
        <StaffAccidental
          accidental={element.pitch.accidental}
          isSelected={isSelected}
          position={position}
        />
      ) : null}
    </>
  );
}
