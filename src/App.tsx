import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box, styled } from "@mui/material";
import { lightTheme, darkTheme } from "./themes/muiTheme";
import CssBaseline from "@mui/material/CssBaseline";

import LobbyPage from "./pages/lobby/Lobby.page";
import CodePage from "./pages/code/Code.page";
import Navbar from "./components/navbar/Navbar";
import { useState } from "react";
import Footer from "./components/footer/footer";

const router = [
  { path: "/", component: LobbyPage },
  { path: "/code/:codeBlockId", component: CodePage },
  { path: "/code", component: CodePage }, //Added for testing - Remove when DB is connected.
  { path: "*", component: LobbyPage },
];

const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: theme.backgroundColors.main,
}));

const BoxContent = styled(Box)({
  flexGrow: 1,
  overflowX: "hidden",
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" ? true : false;
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BoxContainer>
        <Navbar onThemeChange={toggleTheme} />
        <BoxContent>
          <Router>
            <Routes>
              {router.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Router>
        </BoxContent>
        <Footer />
      </BoxContainer>
    </ThemeProvider>
  );
};

export default App;
