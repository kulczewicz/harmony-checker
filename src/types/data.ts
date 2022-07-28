type NoteSymbol = "C" | "D" | "E" | "F" | "G" | "A" | "B";
type Octave = 2 | 3 | 4 | 5 | 6; // others are out of the voice range
type NotePitch = `${NoteSymbol}${Octave}`;

/* NoteDuration in thirty-second notes - we can get only following values
 * whole note = 32            | whole with dot = 48                | whole with two dots = 56
 * half note = 16             | half with dot = 24                 | half with two dots = 28
 * quarter note = 8           | quarter with dot = 12              | quarter with two dots = 14
 * eighth note = 4            | eighth with dot = 6                | eighth with two dots = 7
 * sixteenth note = 2         | sixteenth with dot = 3             | sixteenth with two dots is a float
 * thirty-second note = 1     | thirty-second with dot is a float  | thirty-second with two dots is a float
 */
type NoteDuration =
  | 1
  | 2
  | 3
  | 4
  | 6
  | 7
  | 8
  | 12
  | 14
  | 16
  | 24
  | 28
  | 32
  | 48
  | 56;

type NoteAccidental =
  | "natural"
  | "flat"
  | "sharp"
  | "double-flat"
  | "double-sharp";

export interface Note {
  duration: NoteDuration;
  pitch: NotePitch;
  accidental?: NoteAccidental;
}
