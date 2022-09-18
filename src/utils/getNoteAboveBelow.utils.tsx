import { voiceRange } from "../constants";
import { NoteElement, NoteOctave, NoteSymbol, NoteSymbolEnum } from "../types";

export function getNoteAbove({
  pitch: { noteSymbol, octave },
  voice,
  ...note
}: NoteElement): NoteElement | null {
  const { highest } = voiceRange[voice];
  if (noteSymbol === highest.noteSymbol && octave === highest.octave) {
    return null;
  }

  if (noteSymbol === "B") {
    return {
      ...note,
      voice,
      pitch: {
        noteSymbol: "C",
        octave: (octave + 1) as NoteOctave,
        accidental: null,
      },
    };
  }

  return {
    ...note,
    voice,
    pitch: {
      octave,
      noteSymbol: NoteSymbolEnum[NoteSymbolEnum[noteSymbol] + 1] as NoteSymbol,
      accidental: null,
    },
  };
}
export function getNoteBelow({
  pitch: { noteSymbol, octave },
  voice,
  ...note
}: NoteElement): NoteElement | null {
  const { lowest } = voiceRange[voice];
  if (noteSymbol === lowest.noteSymbol && octave === lowest.octave) {
    return null;
  }

  if (noteSymbol === "C") {
    return {
      ...note,
      voice,
      pitch: {
        noteSymbol: "B",
        octave: (octave - 1) as NoteOctave,
        accidental: null,
      },
    };
  }

  return {
    ...note,
    voice,
    pitch: {
      octave,
      noteSymbol: NoteSymbolEnum[NoteSymbolEnum[noteSymbol] - 1] as NoteSymbol,
      accidental: null,
    },
  };
}
