import React from "react";
import { Button, useTheme } from "@mui/material";

interface DynamicButtonProps {
  onClick: () => void;
  label: string;
  variant?: "text" | "outlined" | "contained";
  size?: "small" | "medium" | "large";
  fontSize?: { xs?: string; sm?: string; md?: string };
  customStyle?: React.CSSProperties;
}

const DynamicButton: React.FC<DynamicButtonProps> = ({
  onClick,
  label,
  variant = "contained",
  size = "small",
  fontSize,
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      variant={variant}
      size={size}
      sx={{
        color: theme.textColors.text,
        backgroundColor: theme.backgroundColors.button,
        textTransform: "none",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          backgroundColor: theme.hoverColors.button,
        },
        fontSize: fontSize || { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
        fontWeight: 400,
        letterSpacing: ".03rem",
      }}
    >
      {label}
    </Button>
  );
};

export default DynamicButton;
