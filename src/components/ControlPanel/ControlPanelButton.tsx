import { Button, ButtonProps } from "theme-ui";

interface ControlPanelButtonProps extends ButtonProps {
  isActive?: boolean;
}
export const controlPanelButtonWidth = 32;
export const controlPanelButtonHeight = 32;
export function ControlPanelButton({
  isActive = false,
  sx,
  ...props
}: ControlPanelButtonProps) {
  return (
    <Button
      sx={{
        padding: "4px",
        mt: "8px",
        mr: "8px",
        minHeight: `${controlPanelButtonWidth}px`,
        minWidth: `${controlPanelButtonWidth}px`,
        color: "black",
        border: "1px solid",
        cursor: "pointer",
        backgroundColor: isActive ? "green" : "white",
        ...sx,
      }}
      {...props}
    />
  );
}
