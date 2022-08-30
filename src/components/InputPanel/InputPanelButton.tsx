import { Button, ButtonProps } from "theme-ui";

interface SelectNoteVoiceButtonProps extends ButtonProps {
  isActive: boolean;
}
export function InputPanelButton({
  isActive,
  sx,
  ...props
}: SelectNoteVoiceButtonProps) {
  return (
    <Button
      // disabled={!isActive}
      sx={{
        padding: "4px",
        minHeight: "32px",
        minWidth: "32px",
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
