export const distanceBetweenTheLines = 11;
export const lineThickness = 1;
export const noteHeadHight = distanceBetweenTheLines + lineThickness;
export const consecutiveNotesDistance = noteHeadHight / 2;
export const staffHeight = 5 * lineThickness + 4 * distanceBetweenTheLines;

export const notesInOctave = 7;
export const octaveNotesDistance = consecutiveNotesDistance * notesInOctave;
export const staffVerticalPadding = octaveNotesDistance;
export const staffWithPaddingHeight = staffHeight + 2 * staffVerticalPadding;
export const sheetHeight = staffHeight * 2 + staffVerticalPadding * 2;

export const barPadding = 4;

export const noteHeight = 45;
export const noteHeadWidth = 15;
export const noteOffset = 2;
export const ledgerLineOutsideWidth = 4;
export const notePadding = ledgerLineOutsideWidth + noteOffset;
export const noteWidthWithPadding = noteHeadWidth + notePadding * 2;

export const noteTailWidth = noteHeadWidth + 10;
export const noteTailWidthWithPadding =
  notePadding + noteHeadWidth + noteTailWidth + noteOffset;

export const timeSignatureWidth = 25;
