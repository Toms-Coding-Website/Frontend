import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Typography, Box, Button } from "@mui/material";
import Container from "@mui/material/Container";
import { lightTheme } from "../../themes/muiTheme";

interface NavbarTitleProps {
  display: { xs: string; md: string };
  variant: "h6" | "h5" | "h4" | "h3" | "h2" | "h1";
}

const NavbarTitle = ({ display, variant }: NavbarTitleProps) => (
  <Box
    component="a"
    href="/"
    sx={{
      display: display,
      alignItems: "center",
      textDecoration: "none",
      color: "inherit",
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
        color: "inherit",
        fontSize: { xs: "1.1rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" },
      }}
    >
      Tom's Online Coding Class
    </Typography>
  </Box>
);

interface NavbarProps {
  onThemeChange: () => void;
}

const Navbar = ({ onThemeChange }: NavbarProps) => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: lightTheme.palette.secondary.main,
        color: lightTheme.palette.primary.main,
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
          <Button
            onClick={onThemeChange}
            sx={{
              color: lightTheme.palette.primary.main,
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "translateY(-3px)",
              },
              fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
              fontWeight: 400,
              letterSpacing: ".03rem",
            }}
          >
            {"Change Theme"}
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
