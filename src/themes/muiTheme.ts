// src/themes/muiTheme.ts
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    textColors: {
      link: string;
      text: string;
      title: string;
    };
    backgroundColors: {
      codeBlock: string;
      navbar: string;
      main: string;
      footer: string;
    };
  }
  interface ThemeOptions {
    textColors?: {
      link?: string;
      text?: string;
      title?: string;
    };
    backgroundColors?: {
      codeBlock?: string;
      navbar?: string;
      main?: string;
      footer?: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
  textColors: {
    link: "#1E88E5",
    text: "#212121",
    title: "#000000",
  },
  backgroundColors: {
    codeBlock: "#f5f5f5",
    navbar: "#e0e0e0",
    main: "#ffffff",
    footer: "#e0e0e0",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
  textColors: {
    link: "#bb86fc",
    text: "#e0e0e0",
    title: "#ffffff",
  },
  backgroundColors: {
    codeBlock: "#424242",
    navbar: "#333333",
    main: "#121212",
    footer: "#333333",
  },
});

export { lightTheme, darkTheme };
