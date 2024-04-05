import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const res = await axios.get(`http://localhost:3000/api/users/${id}`);
    setUserData(res.data[0]);
  };

  const notifySuccess = () => toast.success("User Details Changed");
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

  // Render loading state while data is being fetched
  if (userData === undefined) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:3000/api/users/${id}`, {
        id: id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        gender: userData.gender,
        available: userData.available,
        avatar: userData.avatar,
        domain: userData.domain,
      });
      const response = res.data;
      notifySuccess();
      setTimeout(() => {
        navigate("/");
      }, 1250);
    } catch (error) {
      if (error.response.status === 400) {
        // const errorMessage = extractErrorMessage(error.response.data);
        const errorMessage = error.message.data;
        console.log(error);
        console.log(errorMessage);
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
    <>
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
            Edit User
          </Typography>
          <TextField
            helperText="First Name"
            name="first_name"
            value={userData.first_name}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            helperText="Last Name"
            name="last_name"
            value={userData.last_name}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            helperText="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth>
            {/* <InputLabel id="gender-label">Gender</InputLabel> */}
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
            {/* <InputLabel id="domain-label">Domain</InputLabel> */}
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
            {/* <InputLabel id="available">Availability</InputLabel> */}
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
            helperText="Avatar Link"
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
              Edit User
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
