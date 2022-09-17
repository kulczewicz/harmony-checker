import { memo } from "react";
import type { KeySignatureSymbols } from "../../../types";
import { KeySignature } from "../KeySignature";
import { Accolade, accoladeWidth } from "./Accolade";
import { Keys, keyWidth } from "./Keys";

export const staffLineBeginningWidth = accoladeWidth + keyWidth;
interface StaffLineBeginningProps {
  keySignatureSymbols: KeySignatureSymbols | null;
}
export function StaffLineBeginningComponent({
  keySignatureSymbols,
}: StaffLineBeginningProps) {
  return (
    <>
      <Accolade />
      <Keys />
      {keySignatureSymbols ? (
        <KeySignature keySignatureSymbols={keySignatureSymbols} />
      ) : null}
    </>
  );
}

export const StaffLineBeginning = memo(StaffLineBeginningComponent);
