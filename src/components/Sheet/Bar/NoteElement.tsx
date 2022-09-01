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
} from "../../Notation";

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
    return ElementNoteSvgUp[durationValue]({
      sx: {
        position: "absolute",
        bottom: `${offsetFromBottom}px`,
        left: `${offsetFromLeft}px`,
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
  offsetFromLeft: number;
}
export function NotationElementLower({
  element,
  offsetFromTop,
  offsetFromLeft,
}: NotationElementLower) {
  const durationValue = element.duration.value;
  if (element.type === "note") {
    return ElementNoteSvgDown[durationValue]({
      sx: {
        position: "absolute",
        top: `${offsetFromTop}px`,
        left: `${offsetFromLeft}px`,
        height: `${noteHeight}px`,
      },
    });
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", top: offsetFromTop },
  });
}
