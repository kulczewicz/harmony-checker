import { noteHeadHight } from "../../constants";
import { DurationValue, SvgPropsThemeUi } from "../../types";

export const restWidths: { [duration in DurationValue]: number } = {
  whole: 24,
  half: 24,
  quarter: 10,
  eights: 10,
  sixteenth: 12,
  thirtySecond: 12,
};
export function WholeRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height={`${noteHeadHight}px`}
      width={`${restWidths["whole"]}px`}
      viewBox="-141 -135 564 288"
      {...props}
    >
      <line
        x1="-138"
        y1="-122"
        x2="423"
        y2="-122"
        stroke="black"
        strokeWidth="24"
      />
      <path d="M282 -109c0 -14 -12 -26 -26 -26h-230c-15 0 -26 12 -26 26v92c0 15 11 26 26 26h230c14 0 26 -11 26 -26v-92z" />
    </svg>
  );
}

export function HalfRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height={`${noteHeadHight}px`}
      width={`${restWidths["half"]}px`}
      viewBox="-141 -279 564 288"
      {...props}
    >
      <line
        x1="-139"
        y1="-2"
        x2="423"
        y2="-2"
        stroke="black"
        strokeWidth="24"
      />
      <path d="M282 -109c0 -14 -12 -26 -26 -26h-230c-15 0 -26 12 -26 26v92c0 15 11 26 26 26h230c14 0 26 -11 26 -26v-92z" />
    </svg>
  );
}

export function QuarterRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height="28px"
      width={`${restWidths["quarter"]}px`}
      viewBox="1 -373 269 748"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        d="M78 -38l-49 60s-10 10 -10 24c0 8 4 19 14 29c45 47 60 90 60 127c0 72 -57 123 -61 134c-3 6 -4 11 -4 16c0 14 10 21 20 21c6 0 13 -3 18 -8c17 -17 165 -193 165 -193s4 -9 4 -19c0 -5 -1 -10 -4 -15c-26 -41 -62 -89 -66 -147v-3l-1 -7v-3c0 -56 31 -93 69 -139 c11 -12 37 -45 37 -57c0 -3 -2 -4 -5 -4c-2 0 -4 0 -8 1l-1 1c-17 6 -50 17 -79 17c-42 0 -63 -32 -63 -73c0 -9 1 -18 4 -26c2 -9 13 -36 26 -36c8 -7 16 -15 16 -24c0 -2 -1 -4 -2 -7c-1 -4 -8 -6 -15 -6c-8 0 -18 3 -26 9c-73 56 -116 105 -116 155c0 49 34 96 86 96 l8 -3h4c4 -1 12 -3 16 -3c5 0 9 1 11 5c1 1 1 3 1 4c0 2 -4 10 -6 14c-13 21 -27 40 -43 60z"
      />
    </svg>
  );
}

export function EighthRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height="16px"
      width={`${restWidths["eights"]}px`}
      viewBox="0 -174 247 425"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        d="M134 107v-10c33 0 83 60 90 66c6 4 9 4 11 4c2 -1 12 -6 12 -16c-1 -5 -6 -21 -10 -39c0 0 -98 -351 -101 -353c-10 -8 -24 -10 -35 -10c-6 0 -29 1 -29 13c18 66 90 265 93 280c1 4 1 8 1 11c0 5 -1 9 -5 9c-1 0 -3 0 -5 -1c-13 -7 -22 -11 -36 -15 c-11 -4 -25 -7 -39 -7c-19 0 -38 6 -54 17c-15 12 -27 30 -27 51c0 37 30 67 67 67s67 -30 67 -67z"
      />
    </svg>
  );
}

export function SixteenthRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height="24px"
      width={`${restWidths["sixteenth"]}px`}
      viewBox="0 -180 320 679"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        d="M208 111v-10c34 1 84 61 91 67c3 2 6 4 11 4c2 -1 10 -5 10 -11c0 -1 -1 -2 -1 -4c-2 -13 -27 -101 -27 -101s-19 -67 -45 -152l-116 -381c-4 -11 -9 -23 -38 -23c-22 0 -31 10 -31 19l1 1v1l95 283v1l1 1c0 4 -2 6 -4 6c-23 -12 -49 -21 -75 -21c-38 0 -80 27 -80 68 c0 38 30 68 68 68c37 0 68 -30 68 -68c0 -3 0 -6 -1 -10c14 0 41 12 49 31c7 15 58 164 58 180c0 5 -2 7 -5 7c-2 0 -4 -1 -7 -2c-23 -13 -51 -22 -78 -22c-38 0 -80 27 -80 68c0 38 31 68 68 68c38 0 68 -30 68 -68z"
      />
    </svg>
  );
}

export function ThirtySecondRest(props: SvgPropsThemeUi) {
  return (
    <svg
      height="32px"
      width={`${restWidths["thirtySecond"]}px`}
      viewBox="0 -426 363 926"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        d="M353 419c2 0 10 -2 10 -11c0 -1 -1 -2 -1 -4c-2 -12 -26 -101 -26 -101s-172 -770 -175 -782c-4 -11 -7 -21 -39 -21c-21 0 -27 8 -27 16c0 2 0 4 1 6c2 7 71 282 71 286c0 3 -3 6 -6 6c-1 0 -2 0 -3 -1c-23 -13 -51 -22 -78 -22c-38 0 -80 27 -80 68c0 38 31 68 68 68 c38 0 68 -30 68 -68c0 -3 0 -6 -1 -10c15 1 46 14 51 35l40 164c0 5 -2 13 -7 13c-1 0 -2 0 -3 -1c-23 -12 -49 -22 -75 -22c-10 0 -19 2 -27 4c-10 3 -19 7 -27 14c-16 12 -28 30 -28 50c0 38 30 68 68 68c37 0 68 -30 68 -68c0 -3 0 -6 -1 -9c16 0 49 20 54 36l39 160v1 l1 2c0 7 -4 17 -11 17c-1 0 -3 0 -4 -1c-23 -12 -50 -22 -76 -22c-10 0 -18 2 -26 4c-10 3 -20 7 -28 14c-16 12 -28 30 -28 50c0 38 31 68 68 68c38 0 68 -30 68 -68v-9c34 0 84 61 91 66c3 2 6 4 11 4z"
      />
    </svg>
  );
}
