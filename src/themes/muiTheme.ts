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
      button: string;
    };
    hoverColors: {
      button: string;
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
      button?: string;
    };
    hoverColors?: {
      button?: string;
    };
  }
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  textColors: {
    link: "#1a4fa1",
    text: "#102C57",
    title: "#102C57",
  },
  backgroundColors: {
    codeBlock: "#f5f5f5",
    navbar: "#DAC0A3",
    main: "#EADBC8",
    footer: "#DAC0A3",
    button: "#c4a684",
  },
  hoverColors: {
    button: "#b3926d",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
  textColors: {
    link: "#d4bc9b",
    text: "#ECDFCC",
    title: "#ECDFCC",
  },
  backgroundColors: {
    codeBlock: "#1e1e1e",
    navbar: "#181C14",
    main: "#3C3D37",
    footer: "#181C14",
    button: "#697565",
  },
  hoverColors: {
    button: "#4e5c49",
  },
});

export { lightTheme, darkTheme };
