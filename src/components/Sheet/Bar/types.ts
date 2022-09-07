interface StaffElementPositionBase {
  offsetFromLeft: number;
}
interface StaffElementTopPosition extends StaffElementPositionBase {
  direction: "up";
  offsetFromBottom: number;
}
interface StaffElementBottomPosition extends StaffElementPositionBase {
  direction: "down";
  offsetFromTop: number;
}

export type StaffElementPosition =
  | StaffElementTopPosition
  | StaffElementBottomPosition;
