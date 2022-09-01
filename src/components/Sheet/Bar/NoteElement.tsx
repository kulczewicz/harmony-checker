import { Box } from "theme-ui";
import {
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

const noteHeight = 46;
interface NotationElementUpper extends SvgPropsThemeUi {
  element: ElementSoprano | ElementTenor;
  offsetFromBottom: number;
  offsetFromLeft: number;
}
export function NotationElementUpper({
  element,
  offsetFromBottom,
  offsetFromLeft,
}: NotationElementUpper) {
  const durationValue = element.duration.value;
  if (element.type === "note") {
    const { linesPosition, numberOfLines } =
      calculateNumberOfLedgerLines(element);
    const Note = ElementNoteSvgUp[durationValue]({
      sx: {
        position: "absolute",
        bottom: `${offsetFromBottom}px`,
        left: `${offsetFromLeft}px`,
        height: `${noteHeight}px`,
      },
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
          offsetFromLeft={offsetFromLeft}
        />
      </>
    );
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", bottom: offsetFromBottom },
  });
}

interface NotationElementLower extends SvgPropsThemeUi {
  element: ElementAlto | ElementBass;
  offsetFromTop: number;
  offsetFromLeft: number;
}
export function NotationElementLower({
  element,
  offsetFromTop,
  offsetFromLeft,
}: NotationElementLower) {
  const durationValue = element.duration.value;
  if (element.type === "note") {
    const { linesPosition, numberOfLines } =
      calculateNumberOfLedgerLines(element);
    const Note = ElementNoteSvgDown[durationValue]({
      sx: {
        position: "absolute",
        top: `${offsetFromTop}px`,
        left: `${offsetFromLeft}px`,
        height: `${noteHeight}px`,
      },
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
          offsetFromLeft={offsetFromLeft}
        />
      </>
    );
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", top: offsetFromTop },
  });
}
