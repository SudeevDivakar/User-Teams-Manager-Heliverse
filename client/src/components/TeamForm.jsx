import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography, Box, TextField, Button, IconButton } from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";

export default function TeamForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    users: [],
  });
  const [newUserId, setNewUserId] = useState("");
  const [userList, setUserList] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    setNewUserId(e.target.value);
  };

  const handleAddUser = () => {
    setUserList([...userList, newUserId]);
    setNewUserId("");
  };

  const handleRemoveUser = (index) => {
    const updatedList = userList.filter((_, i) => i !== index);
    setUserList(updatedList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if userList is empty
    if (userList.length === 0) {
      toast.error("Please add at least one user.");
      return;
    }

    try {
      const updatedUserData = {
        ...userData,
        users: userList,
      };

      const response = await axios.post(
        "http://localhost:3000/api/team",
        updatedUserData
      );
      const createdTeam = response.data;
      if (createdTeam.error) {
        toast.error(createdTeam.message);
      } else {
        toast.success("Team created successfully");
        setTimeout(() => {
          navigate("/teams");
        }, 1250);
      }
    } catch (error) {
      toast.error("Failed to create team. Please try again later.");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", mb: 4, mt: 4 }}
            gutterBottom
          >
            Create Team
          </Typography>
          <TextField
            label="Team ID"
            name="id"
            value={userData.id}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Team Name"
            name="name"
            value={userData.team_name}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 2 }}>
            {" "}
            <Typography variant="h6" sx={{ mb: 1 }}>
              Added Users
            </Typography>
            <Box
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: "4px",
                padding: "8px",
                minHeight: "100px",
              }}
            >
              {userList.map((user, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "lightgreen",
                    borderRadius: "4px",
                    padding: "4px",
                    marginRight: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <Typography sx={{ marginRight: "8px" }}>{user}</Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleRemoveUser(index)}
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <TextField
            label="Add User by User IDs"
            name="users"
            value={newUserId}
            onChange={handleUserChange}
            fullWidth
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAddUser} color="primary">
                  <AddCircleOutline />
                </IconButton>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mb: 2, width: 200 }}
            >
              Create
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="contained"
              color="primary"
              sx={{ mb: 2, width: 200 }}
            >
              Back To Users
            </Button>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={1250}
            hideProgressBar={true}
          />
        </Box>
      </form>
    </>
  );
}
