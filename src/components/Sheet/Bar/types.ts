interface StaffElementPositionBase {
  offsetFromLeft: number;
}
interface StaffElementTopPosition extends StaffElementPositionBase {
  direction: "up";
  offsetFromBottom: number;
  accidentalOffsetFromLeft?: number;
}
interface StaffElementBottomPosition extends StaffElementPositionBase {
  direction: "down";
  offsetFromTop: number;
  accidentalOffsetFromLeft?: number;
}

export type StaffElementPosition =
  | StaffElementTopPosition
  | StaffElementBottomPosition;
