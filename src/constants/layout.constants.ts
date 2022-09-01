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

export const noteElementPadding = 4;
