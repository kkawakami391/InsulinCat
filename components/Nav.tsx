import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import React from "react";

declare module "@mui/material/AppBar" {
  interface AppBarPropsColorOverrides {
    green: true;
  }
}

const Nav = () => {
  return (
    <AppBar position="fixed" color="green">
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <IconButton size="large">
          <CatchingPokemonIcon fontSize="large" />
          <Typography variant="h5" sx={{ ml: "10px" }}>
            GatitaInsulina
          </Typography>
        </IconButton>
        <Button
          sx={{
            color: "white",
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
