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
import { distanceBetweenConsecutiveNotes } from "../Staff";

interface NotationElementUpper extends SvgPropsThemeUi {
  element: ElementSoprano | ElementTenor;
  offsetFromBottom: number;
}
export function NotationElementUpper({
  element,
  offsetFromBottom,
  ...props
}: NotationElementUpper) {
  const durationValue = element.duration.value;
  if (durationValue === "whole") {
    return <WholeNote height={`${distanceBetweenConsecutiveNotes * 2}px`} />;
  }
  if (element.type === "note") {
    return ElementNoteSvgUp[durationValue]({
      sx: {
        position: "absolute",
        bottom: offsetFromBottom,
        height: "39px",
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
  if (durationValue === "whole") {
    return <WholeNote height={`${distanceBetweenConsecutiveNotes * 2}px`} />;
  }
  if (element.type === "note") {
    return ElementNoteSvgDown[durationValue]({
      sx: { position: "absolute", top: offsetFromTop, height: "39px" },
    });
  }
  return ElementRestSvg[durationValue]({
    sx: { position: "absolute", top: offsetFromTop },
  });
}
