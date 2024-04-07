import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#100b36" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <img
            src="/heliverse_logo.jpeg"
            alt="Heliverse Logo"
            style={{ width: 100, height: 65, marginRight: 16 }}
          />
          <Box>
            <Button
              color="inherit"
              sx={{ fontFamily: "Calibri" }}
              onClick={() => navigate("/")}
            >
              View Users
            </Button>
            <Button
              color="inherit"
              sx={{ fontFamily: "Calibri" }}
              onClick={() => navigate("/addUser")}
            >
              Add User
            </Button>
            <Button
              color="inherit"
              sx={{ fontFamily: "Calibri" }}
              onClick={() => navigate("/addTeam")}
            >
              Create Team
            </Button>
            <Button
              color="inherit"
              sx={{ fontFamily: "Calibri" }}
              onClick={() => navigate("/teams")}
            >
              View Teams
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
