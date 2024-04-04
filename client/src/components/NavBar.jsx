import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#100b36" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="heliverse_logo.jpeg"
            alt="Heliverse Logo"
            style={{ width: 100, height: 65, marginRight: 16 }}
          />
          <Box>
            <Button color="inherit" sx={{ fontFamily: "Comic Sans MS" }}>
              Add User
            </Button>
            <Button color="inherit" sx={{ fontFamily: "Comic Sans MS" }}>
              Create Team
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
