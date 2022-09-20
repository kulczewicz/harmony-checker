import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Flex, FlexProps } from "theme-ui";
import { useBars } from "../../hooks";
import {
  barsState,
  defaultBarsState,
  defaultBarWithoutBarNumber,
  selectedBarNumberState,
  selectedBeatPositionState,
} from "../../NoteInputState";
import { ControlPanelButton } from "./ControlPanelButton";
import { inputPanelSectionStyles } from "./styles";

interface BarsInputPanelProps extends FlexProps {
  selectedBarNumber: number | null;
  setSelectedBarNumber: SetterOrUpdater<number | null>;
  setSelectedBeatPosition: SetterOrUpdater<number | null>;
}
export function BarsInputPanel({
  selectedBarNumber,
  setSelectedBarNumber,
  setSelectedBeatPosition,
  sx,
  ...props
}: BarsInputPanelProps) {
  const { bars, resetBars, updateBarsWithCache } = useBars();
  return (
    <Flex
      sx={{ ...inputPanelSectionStyles, flexWrap: "wrap", ...sx }}
      {...props}
    >
      <ControlPanelButton
        isActive={false}
        onClick={() => {
          if (
            selectedBarNumber === null ||
            selectedBarNumber === undefined ||
            bars.length < 2
          )
            return;

          const barsBefore = bars.slice(0, selectedBarNumber);
          const barsAfter = bars
            .slice(selectedBarNumber + 1)
            .map(({ barNumber, ...bar }) => ({
              barNumber: barNumber - 1,
              ...bar,
            }));

          if (barsAfter.length === 0) {
            const newSelectedBarNumber = selectedBarNumber - 1;
            if (newSelectedBarNumber < 0) {
              return;
            }
            setSelectedBarNumber(newSelectedBarNumber);
          }
          setSelectedBeatPosition(0);
          updateBarsWithCache([...barsBefore, ...barsAfter]);
        }}
      >
        - bar
      </ControlPanelButton>
      <ControlPanelButton
        isActive={false}
        onClick={() => {
          if (selectedBarNumber === null || selectedBarNumber === undefined)
            return;

          const newBarNumber = selectedBarNumber + 1;
          const barsBefore = bars.slice(0, newBarNumber);
          const barsAfter = bars
            .slice(newBarNumber)
            .map(({ barNumber, ...bar }) => ({
              barNumber: barNumber + 1,
              ...bar,
            }));
          updateBarsWithCache([
            ...barsBefore,
            { barNumber: newBarNumber, ...defaultBarWithoutBarNumber },
            ...barsAfter,
          ]);
        }}
      >
        + bar
      </ControlPanelButton>
      <ControlPanelButton
        sx={{ color: "red" }}
        isActive={false}
        onClick={resetBars}
      >
        Reset sheet
      </ControlPanelButton>
    </Flex>
  );
}
