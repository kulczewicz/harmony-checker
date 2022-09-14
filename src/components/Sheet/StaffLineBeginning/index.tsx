import { memo } from "react";
import { KeySignatures } from "../KeySignatures";
import { Accolade, accoladeWidth } from "./Accolade";
import { Keys, keyWidth } from "./Keys";

export const staffLineBeginningWidth = accoladeWidth + keyWidth;
export function StaffLineBeginningComponent() {
  return (
    <>
      <Accolade />
      <Keys />
      <KeySignatures
        musicKey={{ mode: "major", note: "B", signature: "flat" }}
      />
    </>
  );
}

export const StaffLineBeginning = memo(StaffLineBeginningComponent);
