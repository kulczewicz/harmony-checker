import { noteHeadHight } from "../../constants";
import { SvgPropsThemeUi } from "../../types";
const signatureSignWidth = 9;

export function FlatSign(props: SvgPropsThemeUi) {
  return (
    <svg
      height={`${noteHeadHight * 2}px`}
      width={`${signatureSignWidth}px`}
      viewBox="0 -438 226 614"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        horizAdvX="226"
        d="M12 -170c-8 10 -12 581 -12 581c1 18 17 28 31 28c10 0 19 -6 19 -17c0 -20 -6 -260 -7 -282c0 -7 4 -14 11 -17c2 -1 3 -1 5 -1c5 0 16 9 22 14c14 9 38 17 55 17c46 -3 90 -39 90 -96c0 -46 -31 -107 -120 -169c-25 -17 -49 -44 -79 -61c0 0 -3 -2 -6 -2s-6 1 -9 5z
    M47 -81c0 -5 2 -15 11 -15c3 0 6 1 10 3c43 27 89 81 89 135c0 25 -12 58 -41 58c-23 0 -63 -29 -70 -49c-1 -4 -2 -16 -2 -32c0 -40 3 -100 3 -100z"
      />
    </svg>
  );
}

export function NaturalSign(props: SvgPropsThemeUi) {
  return (
    <svg
      height={`${noteHeadHight * 2}px`}
      width={`${signatureSignWidth}px`}
      viewBox="0 -341 168 676"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        horizAdvX="169"
        d="M141 181l15 5c1 1 3 1 4 1c4 0 8 -3 8 -8v-502c0 -7 -6 -12 -12 -12h-13c-7 0 -12 5 -12 12v149c0 8 -7 11 -17 11c-29 0 -85 -24 -99 -30c-1 -1 -3 -1 -4 -1l-2 -1c-6 0 -9 3 -9 9v515c0 7 5 12 12 12h13c6 0 12 -5 12 -12v-167c0 -4 4 -5 10 -5c26 0 90 23 90 23
c1 0 2 1 4 1zM37 39v-103c0 -4 5 -6 12 -6c25 0 82 23 82 41v103c0 4 -3 5 -9 5c-24 0 -85 -26 -85 -40z"
      />
    </svg>
  );
}

export function SharpSign({ sx, ...props }: SvgPropsThemeUi) {
  console.log(props);
  return (
    <svg
      sx={{
        height: `${noteHeadHight * 2}px`,
        width: `${signatureSignWidth}px`,
        ...sx,
      }}
      viewBox="0 -350 249 698"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        horizAdvX="249"
        d="M237 118l-26 -10c-8 -3 -13 -22 -13 -29v-93c0 -12 7 -18 13 -18l26 10c2 1 3 1 5 1c4 0 7 -3 7 -8v-71c0 -6 -5 -14 -12 -17c0 0 -21 -8 -28 -11s-11 -15 -11 -23v-142c0 -6 -6 -11 -17 -11c-7 0 -13 5 -13 11v125c0 6 -5 18 -14 18l-2 -1h-1l-61 -25
c-5 -2 -10 -9 -10 -22v-139c0 -6 -7 -11 -17 -11c-7 0 -13 5 -13 11v123c0 5 -5 16 -12 16c-1 0 -2 0 -3 -1c-9 -3 -23 -9 -24 -9l-2 -1c-6 0 -9 3 -9 9v71c0 6 5 14 12 16c0 0 21 9 27 11c6 3 11 12 11 23v99c0 8 -6 18 -14 18l-1 -1c-8 -4 -23 -10 -24 -10l-2 -1
c-6 0 -9 3 -9 9v71c0 6 5 14 12 16c0 0 20 8 26 11s12 13 12 27v135c0 6 6 11 16 11c7 0 14 -5 14 -11v-120c0 -8 3 -20 12 -20c17 4 51 18 63 25c9 6 12 19 13 29v130c0 6 6 11 16 11c8 0 14 -5 14 -11v-122c0 -8 7 -13 14 -13c5 1 25 9 25 9c2 1 3 1 5 1c4 0 7 -3 7 -8
v-71c0 -6 -5 -14 -12 -17zM168 -45c2 9 4 37 4 64s-2 52 -4 57c-2 4 -8 6 -15 6c-25 0 -71 -21 -73 -38c-2 -8 -3 -43 -3 -74c0 -24 1 -46 3 -50c1 -3 6 -5 12 -5c23 0 70 20 76 40z"
      />
    </svg>
  );
}
