import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserForm() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    domain: "",
    available: "",
    avatar: "",
  });

  const notifySuccess = () => toast.success("User Successfully Added");
  const notifyError = (message) => toast.error(message);

  const domainOptions = [
    "Business Development",
    "Finance",
    "IT",
    "Management",
    "Marketing",
    "Sales",
    "UI Designing",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/users", userData);
      notifySuccess();
      setTimeout(() => {
        navigate("/");
      }, 1250);
    } catch (error) {
      if (error.response.status === 400) {
        const errorMessage = extractErrorMessage(error.response.data);
        if (errorMessage) {
          toast.error(errorMessage);
        } else {
          notifyError(error);
        }
      } else {
        notifyError(error);
      }
    }
  };

  const extractErrorMessage = (htmlResponse) => {
    const startIndex = htmlResponse.indexOf("Error: ");
    const endIndex = htmlResponse.indexOf("<br>");
    if (startIndex !== -1 && endIndex !== -1) {
      return htmlResponse.substring(startIndex + 7, endIndex);
    }
    return null;
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", mt: 4 }}
          gutterBottom
        >
          Add User
        </Typography>
        <TextField
          label="ID"
          name="id"
          value={userData.id}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="First Name"
          name="first_name"
          value={userData.first_name}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={userData.last_name}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          >
            <MenuItem value="Agender">Agender</MenuItem>
            <MenuItem value="Bigender">Bigender</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Genderfluid">Genderfluid</MenuItem>
            <MenuItem value="Genderqueer">Genderqueer</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Non-binary">Non-binary</MenuItem>
            <MenuItem value="Polygender">Polygender</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="domain-label">Domain</InputLabel>
          <Select
            labelId="domain-label"
            name="domain"
            value={userData.domain}
            onChange={handleChange}
            required
          >
            {domainOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="available">Availability</InputLabel>
          <Select
            labelId="available"
            name="available"
            value={userData.available}
            onChange={handleChange}
            required
          >
            <MenuItem value={true}>Available</MenuItem>
            <MenuItem value={false}>Unavailable</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Avatar Link"
          name="avatar"
          value={userData.avatar}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 2, width: 200 }}
          >
            Add User
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
  );
}
