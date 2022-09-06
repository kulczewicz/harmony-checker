import {
  consecutiveNotesDistance,
  octaveNotesDistance,
  staffWithPaddingHeight,
} from "../constants";
import {
  highestNoteInBassStaff,
  highestNoteInViolinStaff,
} from "../constants/notes.constants";
import {
  NoteOctave,
  NotePitch,
  NoteSymbol,
  NoteSymbolFromTopEnum,
  Voice,
} from "../types";
import { calculateNotePositionFromTop } from "./calculateNotesPosition.utils";

function getRangeForVoice(voice: Voice): {
  lowest: NotePitch;
  highest: NotePitch;
} {
  if (voice === "soprano") {
    return {
      lowest: { octave: 4, noteSymbol: "C" },
      highest: { octave: 5, noteSymbol: "A" },
    };
  }
  if (voice === "alto") {
    return {
      lowest: { octave: 3, noteSymbol: "F" },
      highest: { octave: 5, noteSymbol: "D" },
    };
  }
  if (voice === "tenor") {
    return {
      lowest: { octave: 3, noteSymbol: "C" },
      highest: { octave: 4, noteSymbol: "G" },
    };
  }
  return {
    lowest: { octave: 2, noteSymbol: "E" },
    highest: { octave: 4, noteSymbol: "E" },
  };
}

interface GetNoteByCursorPositonInBarParams {
  yPosition: number;
  voice: Voice;
}
export function getNotePitchByCursorPositon({
  yPosition,
  voice,
}: GetNoteByCursorPositonInBarParams): NotePitch {
  const highestNoteInStaff =
    voice === "soprano" || voice === "alto"
      ? highestNoteInViolinStaff
      : highestNoteInBassStaff;

  const { highest, lowest } = getRangeForVoice(voice);

  const initialOffset =
    (voice === "soprano" || voice === "alto" ? 0 : staffWithPaddingHeight) +
    consecutiveNotesDistance / 2 +
    calculateNotePositionFromTop({
      pitch: { octave: highest.octave, noteSymbol: "B" },
      voice,
    });

  let octave: NoteOctave = highest.octave;

  const highestNoteOffset =
    initialOffset +
    NoteSymbolFromTopEnum[highest.noteSymbol] * consecutiveNotesDistance;

  if (yPosition <= highestNoteOffset) {
    return highest;
  }

  while (octave >= lowest.octave) {
    const highestNoteOctave =
      voice === "soprano" || voice === "alto"
        ? highestNoteInStaff.octave - 1
        : highestNoteInStaff.octave;
    const offset =
      initialOffset + (highestNoteOctave - octave) * octaveNotesDistance;
    const offsetTo =
      octave === lowest.octave
        ? offset +
          (NoteSymbolFromTopEnum[lowest.noteSymbol] + 1) *
            consecutiveNotesDistance
        : offset + octaveNotesDistance;

    if (yPosition < offsetTo) {
      const noteNumberFromTheTop = Math.floor(
        (yPosition - offset) / consecutiveNotesDistance
      );
      return {
        octave,
        noteSymbol: NoteSymbolFromTopEnum[noteNumberFromTheTop] as NoteSymbol,
      };
    }
    octave--;
  }
  return lowest;
}
