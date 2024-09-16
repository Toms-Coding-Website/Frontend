import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, Box, styled } from "@mui/material";
import { lightTheme, darkTheme } from "./themes/muiTheme";

import LobbyPage from "./pages/lobby/Lobby.page";
import CodePage from "./pages/code/Code.page";
import Navbar from "./components/navbar/Navbar";
import CodeEditor from "./components/codeEditor/CodeEditor";
import { useState } from "react";

const router = [
  { path: "/", component: LobbyPage },
  { path: "/code/:codeId", component: CodePage },
  { path: "*", component: LobbyPage },
];

const BoxContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

const BoxContent = styled(Box)({
  flexGrow: 1,
  overflowX: "hidden",
});

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <BoxContainer sx={{ backgroundColor: lightTheme.palette.primary.main }}>
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
        <CodeEditor onSubmit={() => {}}></CodeEditor>
      </BoxContainer>
    </ThemeProvider>
  );
};

export default App;
