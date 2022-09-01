import {
  ElementAlto,
  ElementBass,
  ElementSoprano,
  ElementTenor,
  SvgPropsThemeUi,
} from "../../../types";
import {
  ElementNoteSvgUp,
  ElementRestSvg,
  ElementNoteSvgDown,
  WholeNote,
} from "../../Notation";
import { consecutiveNotesDistance } from "../Staff";

const noteHeight = 46;
interface NotationElementUpper extends SvgPropsThemeUi {
  element: ElementSoprano | ElementTenor;
  offsetFromBottom: number;
}
export function NotationElementUpper({
  element,
  offsetFromBottom,
}: NotationElementUpper) {
  const durationValue = element.duration.value;
  if (element.type === "note") {
    return ElementNoteSvgUp[durationValue]({
      sx: {
        position: "absolute",
        bottom: `${offsetFromBottom}px`,
        height: `${noteHeight}px`,
      },
    });
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", bottom: offsetFromBottom },
  });
}

interface NotationElementLower extends SvgPropsThemeUi {
  element: ElementAlto | ElementBass;
  offsetFromTop: number;
}
export function NotationElementLower({
  element,
  offsetFromTop,
}: NotationElementLower) {
  const durationValue = element.duration.value;
  if (element.type === "note") {
    return ElementNoteSvgDown[durationValue]({
      sx: {
        position: "absolute",
        top: `${offsetFromTop}px`,
        height: `${noteHeight}px`,
      },
    });
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", top: offsetFromTop },
  });
}
