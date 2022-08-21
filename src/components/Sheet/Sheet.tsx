import { useEffect, useState } from "react";
import { Box, Flex } from "theme-ui";
import { Bar } from "../../types/data";
import { BarBlock } from "./Bar";
import { Keys } from "./Keys";
import { KeySignatures } from "./KeySignatures";
import { sheetHeight, staffVerticalPadding } from "./Staff";
import { TimeSignatures } from "./TimeSignatures";

const Accolade = () => (
  <Box
    sx={{
      my: `${staffVerticalPadding}px`,
      height: `${sheetHeight}px`,
      borderRight: "2px solid",
    }}
  >
    <svg
      viewBox="2 17 10 110" // in order to fit path to the svg
      height="100%"
    >
      <path d="m 8.9257633,18.760152 c -1.199791,1.588481 -2.918635,5.304994 -3.606276,7.244894 -1.031203,4.069706 -1.374937,9.019732 -1.031203,13.797599 0.168416,1.586706 0.512323,5.122185 1.031203,7.951279 0.856057,6.724865 1.031375,9.553959 1.031375,12.383052 -0.175318,4.596834 -1.375109,8.304473 -3.269099,10.780373 -0.343906,0.353193 -0.512322,0.706386 -0.512322,0.88742 0,0.181033 0.168416,0.534226 0.512322,0.887419 1.89399,2.475901 3.093781,6.18354 3.269099,10.608213 0,3.001253 -0.175318,5.830347 -1.031375,12.374179 -0.51888,3.010127 -0.862787,6.54561 -1.031203,7.96015 -0.343734,4.95003 0,9.90006 1.031203,13.78873 0.856057,3.18228 3.95001,8.66654 4.8127967,8.66654 0.343734,0 0.687468,-0.3532 0.687468,-0.70816 0,-0.17926 -0.343734,-0.70639 -0.687468,-1.24062 -2.0625777,-3.00125 -2.9253647,-6.0096 -3.2690987,-10.60643 0,-2.8291 0.175146,-5.48426 1.031203,-12.20202 0.343734,-2.648063 0.687641,-5.83035 0.862786,-7.072737 0.687641,-8.485506 -0.687468,-15.737498 -4.125155,-21.040718 -0.519053,-0.70816 -0.862787,-1.414546 -0.862787,-1.414546 0,0 0.343734,-0.706386 0.862787,-1.414547 3.437687,-5.303219 4.812796,-12.555212 4.125155,-21.221751 -0.175145,-1.061354 -0.519052,-4.243641 -0.862786,-7.070959 -0.856057,-6.538508 -1.031203,-9.193667 -1.031203,-12.02276 0.343734,-4.596834 1.206521,-7.605186 3.2690987,-10.606439 0.687468,-1.061354 0.862787,-1.414547 0.519052,-1.76774 -0.519052,-0.354967 -0.8627857,-0.181033 -1.7255727,1.059579 z" />
    </svg>
  </Box>
);

const bars: Bar[] = [
  {
    length: 32,
    voices: {
      soprano: [
        {
          type: "note",
          voice: "soprano",
          duration: { value: "quarter" },
          position: 0,
          pitch: { octave: 4, noteSymbol: "A" },
        },
        {
          type: "note",
          voice: "soprano",
          duration: { value: "quarter" },
          position: 8,
          pitch: { octave: 4, noteSymbol: "B" },
        },
        {
          type: "note",
          voice: "soprano",
          duration: { value: "quarter" },
          position: 16,
          pitch: { octave: 4, noteSymbol: "G" },
        },
        {
          type: "note",
          voice: "soprano",
          duration: { value: "eights" },
          position: 24,
          pitch: { octave: 4, noteSymbol: "A" },
        },
        {
          type: "note",
          voice: "soprano",
          duration: { value: "eights" },
          position: 28,
          pitch: { octave: 5, noteSymbol: "C" },
        },
      ],
      alto: [
        {
          type: "note",
          voice: "alto",
          duration: { value: "half" },
          position: 0,
          pitch: { octave: 4, noteSymbol: "F" },
        },
        {
          type: "note",
          voice: "alto",
          duration: { value: "half" },
          position: 16,
          pitch: { octave: 4, noteSymbol: "E" },
        },
      ],
      tenor: [
        {
          type: "note",
          voice: "tenor",
          duration: { value: "quarter" },
          position: 0,
          pitch: { octave: 3, noteSymbol: "C" },
        },
        {
          type: "note",
          voice: "tenor",
          duration: { value: "quarter" },
          position: 8,
          pitch: { octave: 3, noteSymbol: "B" },
        },
        {
          type: "note",
          voice: "tenor",
          duration: { value: "quarter" },
          position: 16,
          pitch: { octave: 4, noteSymbol: "C" },
        },
        {
          type: "note",
          voice: "tenor",
          duration: { value: "quarter" },
          position: 24,
          pitch: { octave: 4, noteSymbol: "C" },
        },
      ],
      bass: [
        {
          type: "note",
          voice: "bass",
          duration: { value: "quarter" },
          position: 0,
          pitch: { octave: 2, noteSymbol: "A" },
        },
        {
          type: "note",
          voice: "bass",
          duration: { value: "quarter" },
          position: 8,
          pitch: { octave: 3, noteSymbol: "D" },
        },
        {
          type: "note",
          voice: "bass",
          duration: { value: "quarter" },
          position: 16,
          pitch: { octave: 3, noteSymbol: "E" },
        },
        {
          type: "rest",
          duration: { value: "quarter" },
          position: 24,
        },
        // {
        //   type: "note",
        //   voice: "bass",
        //   duration: { value: "quarter" },
        //   position: 24,
        //   pitch: { octave: 3, noteSymbol: "E" },
        // },
      ],
    },
  },
];

export function Sheet() {
  useEffect(() => {
    console.log("Sheet rerenders");
  });
  return (
    <Flex
      sx={{
        width: "100%",
        maxWidth: "1024px",
      }}
    >
      <Accolade />
      <Keys />
      <KeySignatures />
      <TimeSignatures />
      {bars.map((bar, index) => (
        <BarBlock key={index} bar={bar} />
      ))}
    </Flex>
  );
}
