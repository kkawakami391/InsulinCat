"use client";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";

interface Props {
  children: React.ReactNode;
}

declare module "@mui/material/styles" {
  interface Palette {
    green: Palette["primary"];
    brown: Palette["secondary"];
  }

  interface PaletteOptions {
    green?: PaletteOptions["primary"];
    brown?: PaletteOptions["secondary"];
  }
}

const MuiThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = createTheme({
    palette: {
      green: {
        main: "#CCD5AE",
        light: "#E9EDC9",
      },
      brown: {
        main: "#FAEDCD",
        light: "#FEFAE0",
        contrastText: "#D4A373",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
