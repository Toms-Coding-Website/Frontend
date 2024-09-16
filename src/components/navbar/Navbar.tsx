import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Box, useTheme } from "@mui/material";
import Container from "@mui/material/Container";
import DynamicButton from "../button/DynamicButton";

interface NavbarTitleProps {
  display: { xs: string; md: string };
  variant: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
}

const NavbarTitle = ({ display, variant }: NavbarTitleProps) => {
  const theme = useTheme();
  return (
    <Box
      component="a"
      href="/"
      sx={{
        display: display,
        alignItems: "center",
        textDecoration: "none",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
        },
      }}
    >
      <img
        src="/hatIcon96.png"
        alt="Icon"
        style={{ width: 40, height: 40, marginRight: 8 }}
      />
      <Typography
        variant={variant}
        noWrap
        sx={{
          fontWeight: 700,
          letterSpacing: ".1rem",
          fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
          color: theme.textColors.title,
        }}
      >
        Tom's Online Coding Class
      </Typography>
    </Box>
  );
};

interface NavbarProps {
  onThemeChange: () => void;
}

const Navbar = ({ onThemeChange }: NavbarProps) => {
  const theme = useTheme();

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.backgroundColors.navbar,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <NavbarTitle display={{ xs: "none", md: "flex" }} variant="h6" />
            <NavbarTitle display={{ xs: "flex", md: "none" }} variant="h5" />
          </Box>
          <DynamicButton
            onClick={onThemeChange}
            label="Change Theme"
            variant="contained"
            size="small"
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
