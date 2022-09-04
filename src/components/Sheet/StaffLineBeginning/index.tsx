import { Accolade, accoladeWidth } from "./Accolade";
import { Keys, keyWidth } from "./Keys";

export const staffLineBeginningWidth = accoladeWidth + keyWidth;
export function StaffLineBeginning() {
  return (
    <>
      <Accolade />
      <Keys />
    </>
  );
}
