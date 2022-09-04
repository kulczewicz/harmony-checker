import { SxProp } from "theme-ui";
import {
  DurationValue,
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
  SvgPropsThemeUi,
} from "../../../types";
import { calculateNumberOfLedgerLines } from "../../../utils/calculateLedgerLines.utils";
import {
  ElementNoteSvgUp,
  ElementRestSvg,
  ElementNoteSvgDown,
} from "../../Notation";
import { LedgerLines } from "./LedgerLines";

interface NotationElementBase extends SvgPropsThemeUi {
  offsetFromLeft: number;
}
interface NotationElementTopProps extends NotationElementBase {
  direction: "up";
  element: ElementSoprano | ElementTenor;
  offsetFromBottom: number;
}
interface NotationElementBottomProps extends NotationElementBase {
  direction: "down";
  element: ElementAlto | ElementBass;
  offsetFromTop: number;
}

type NotationElementProps =
  | NotationElementTopProps
  | NotationElementBottomProps;
export function NotationElement(notationElement: NotationElementProps) {
  const sx: SxProp["sx"] = {
    position: "absolute",
    left: `${notationElement.offsetFromLeft}px`,
    ...(notationElement.direction === "up"
      ? { bottom: `${notationElement.offsetFromBottom}px` }
      : { top: `${notationElement.offsetFromTop}px` }),
  };

  const { element, offsetFromLeft } = notationElement;

  const durationValue = element.duration.value;

  if (element.type === "note") {
    const { linesPosition, numberOfLines } =
      calculateNumberOfLedgerLines(element);
    const ElementNoteSvg =
      notationElement.direction === "up"
        ? ElementNoteSvgUp
        : ElementNoteSvgDown;
    const Note = ElementNoteSvg[durationValue]({ sx });
    if (linesPosition === "inside") {
      return Note;
    }
    return (
      <>
        {Note}
        <LedgerLines
          linesPosition={linesPosition}
          numberOfLines={numberOfLines}
          offsetFromLeft={offsetFromLeft}
        />
      </>
    );
  }
  return ElementRestSvg[durationValue]({ sx });
}
