import {
  noteHeadHight,
  noteHeadWidth,
  noteHeight,
  noteTailWidth,
} from "../../constants";
import { SvgPropsThemeUi } from "../../types/css";

const addPropsToComponent =
  <T, K>(comp: (props: T) => K, extendedProps: T) =>
  (props: T) =>
    comp({ ...props, ...extendedProps });

export function WholeNote({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeadHight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox="0 -137 459 273"
      {...props}
    >
      <path
        transform="scale(1, -1)"
        d="M235 136c101 0 224 -58 224 -135c0 -76 -57 -138 -235 -138c-162 0 -224 65 -224 138c0 74 90 135 235 135zM207 111c-51 0 -90 -14 -90 -70c0 -70 69 -153 141 -153c49 0 83 22 83 77c0 66 -60 146 -134 146z"
      />
    </svg>
  );
}

const halfNotePathPoints =
  "M112 -145c-63 0 -112 35 -112 96c0 60 54 194 227 194c35 0 64 -10 84 -27v757h30v-827c0 -39 -39 -193 -229 -193zM256 97c-55 0 -222 -91 -222 -148c0 -28 26 -49 53 -49c25 0 61 12 113 47c81 53 105 81 105 104c0 26 -24 46 -49 46z";

export function HalfNoteUp({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox="0 -875 341 1020"
      {...props}
    >
      <path transform="scale(1, -1)" d={halfNotePathPoints} />
    </svg>
  );
}

export function HalfNoteDown({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox="-340 -145 341 1020"
      {...props}
    >
      <path transform="scale(-1, 1)" d={halfNotePathPoints} />
    </svg>
  );
}

const quarterNotePathPoints =
  "M302 115v760h30v-828c0 -95 -123 -188 -223 -188c-61 0 -109 35 -109 94c0 97 99 188 222 188c33 0 61 -9 80 -26z";

export function QuarterNoteUp({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{
        height: `${noteHeight}px`,
        width: `${noteHeadWidth}px`,
        ...sx,
      }}
      viewBox="0 -872 332 1016"
      {...props}
    >
      <path transform="scale(1, -1)" d={quarterNotePathPoints} />
    </svg>
  );
}

export function QuarterNoteDown({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox="-330 -140 332 1016"
      {...props}
    >
      <path transform="scale(-1, 1)" d={quarterNotePathPoints} />
    </svg>
  );
}

const eighthNoteTailPathPoints =
  "M238 -790c-5 -17 -22 -23 -28 -19s-16 13 -16 29c0 4 1 9 3 15c17 45 24 92 24 137c0 59 -9 116 -24 150c-36 85 -131 221 -197 233v239c0 12 8 15 19 15c10 0 18 -6 21 -22c16 -96 58 -182 109 -261c63 -100 115 -218 115 -343c0 -78 -26 -173 -26 -173z";
const sixteenthNoteTailPathPoints =
  "M272 -796c-6 -13 -13 -17 -20 -17c-14 0 -22 13 -22 26c0 3 0 5 1 9c5 30 8 60 8 89c0 52 -9 101 -32 149c-69 140 -140 142 -202 144h-5v388c0 7 11 10 17 10s18 -2 20 -13c17 -106 73 -122 127 -180c72 -78 98 -106 108 -174c2 -12 3 -23 3 -36 c0 -61 -22 -121 -25 -127c-1 -3 -1 -5 -1 -7c0 -4 1 -6 1 -9c18 -37 29 -78 29 -120v-22c0 -48 -3 -105 -7 -110zM209 -459c2 -3 4 -4 7 -4c5 0 12 3 13 6c5 8 5 18 7 26c1 7 1 13 1 20c0 32 -9 63 -27 89c-33 49 -87 105 -148 105h-8c-8 0 -14 -6 -14 -10c0 -1 0 -2 1 -3 c21 -82 67 -106 114 -160c21 -24 38 -44 54 -69z";
const thirtySecondNoteTailPathPoints =
  "M260 -673c0 -9 1 -18 1 -28c0 -43 -4 -89 -7 -95c-7 -11 -14 -16 -20 -16c-2 0 -4 1 -6 2c-7 3 -13 12 -13 24c0 2 1 4 1 7c5 29 8 57 8 85c0 48 -9 93 -31 137c-64 130 -130 132 -188 134h-5v560c0 7 8 12 14 12c10 0 17 -10 18 -19c17 -100 71 -116 121 -170 c67 -73 90 -100 101 -161c2 -9 2 -18 2 -28c0 -39 -11 -80 -20 -106c14 -29 21 -61 21 -93c0 -57 -21 -112 -23 -119c-1 -2 -1 -4 -1 -6c0 -3 0 -5 1 -7c15 -36 24 -74 26 -113zM208 -181c-55 93 -114 117 -169 117c16 -97 65 -114 114 -168c23 -25 41 -44 55 -62 c5 17 10 34 12 44c1 7 3 13 3 21c0 13 -4 28 -15 48zM219 -456c1 8 2 16 2 24c0 81 -90 177 -170 177c-9 0 -14 -9 -12 -16c22 -73 63 -95 106 -146l5 -5c17 -20 31 -37 46 -59c1 -3 4 -4 7 -4c5 0 10 3 11 6c3 7 3 15 5 23z";

const noteWithTailUpViewBox = "0 0 20.9 37.2";
const noteWithTailDownViewBox = "0 0 12 37.5";

export function EighthsNoteUp({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteTailWidth}px`, ...sx }}
      viewBox={noteWithTailUpViewBox}
      {...props}
    >
      <svg y="0.3" width="12" viewBox="0 -872 332 1016">
        <path transform="scale(1, -1)" d={quarterNotePathPoints} />
      </svg>
      <svg x="10.9" y="-3" width="10" viewBox="0 -9 264 819.19">
        <path transform="scale(1, -1)" d={eighthNoteTailPathPoints} />
      </svg>
    </svg>
  );
}

export function EighthsNoteDown({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox={noteWithTailDownViewBox}
      {...props}
    >
      <svg y="-0.2" width="12" viewBox="-330 -140 332 1016">
        <path transform="scale(-1, 1)" d={quarterNotePathPoints} />
      </svg>
      <svg y="5" width="10.5" viewBox="0 -810 317 819.19">
        <path transform="scale(1.2, 1)" d={eighthNoteTailPathPoints} />
      </svg>
    </svg>
  );
}

export function SixteenthNoteUp({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteTailWidth}px`, ...sx }}
      viewBox={noteWithTailUpViewBox}
      {...props}
    >
      <svg y="0.3" width="12" viewBox="0 -872 332 1016">
        <path transform="scale(1, -1)" d={quarterNotePathPoints} />
      </svg>
      <svg x="10.9" y="-3.1" width="10" viewBox="0 -2 279 855.75">
        <path transform="scale(1, -1.05)" d={sixteenthNoteTailPathPoints} />
      </svg>
    </svg>
  );
}

export function SixteenthNoteDown({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox={noteWithTailDownViewBox}
      {...props}
    >
      <svg y="-0.2" width="12" viewBox="-330 -140 332 1016">
        <path transform="scale(-1, 1)" d={quarterNotePathPoints} />
      </svg>
      <svg y="4.6" width="10.5" viewBox="0 -813 306.9 815">
        <path transform="scale(1.1, 1)" d={sixteenthNoteTailPathPoints} />
      </svg>
    </svg>
  );
}

export function ThirtySecondNoteUp({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteTailWidth}px`, ...sx }}
      viewBox={noteWithTailUpViewBox}
      {...props}
    >
      <svg y="0.3" width="12" viewBox="0 -872 332 1016">
        <path transform="scale(1, -1)" d={quarterNotePathPoints} />
      </svg>
      <svg x="10.9" y="-3" width="10.5" viewBox="0 -150 326.25 961">
        <path transform="scale(1.2, -1)" d={thirtySecondNoteTailPathPoints} />
      </svg>
    </svg>
  );
}

export function ThirtySecondNoteDown({ sx, ...props }: SvgPropsThemeUi) {
  return (
    <svg
      sx={{ height: `${noteHeight}px`, width: `${noteHeadWidth}px`, ...sx }}
      viewBox={noteWithTailDownViewBox}
      {...props}
    >
      <svg y="-0.2" width="12" viewBox="-330 -140 332 1016">
        <path transform="scale(-1, 1)" d={quarterNotePathPoints} />
      </svg>
      <svg width="10.2" y="4.6" viewBox="0 -609 261 720.75">
        <path transform="scale(1, 0.75)" d={thirtySecondNoteTailPathPoints} />
      </svg>
    </svg>
  );
}
