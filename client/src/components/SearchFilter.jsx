import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import axios from "axios";

export default function SearchFilter({ fetchUsers, setUsers }) {
  const [formData, setFormData] = useState({
    domain: "",
    gender: "",
    available: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    let queryParameters = [];

    // Add non-empty fields to the query parameters
    if (formData.domain !== "") {
      queryParameters.push(`domain=${formData.domain}`);
    }
    if (formData.gender !== "") {
      queryParameters.push(`gender=${formData.gender}`);
    }
    if (formData.available !== "") {
      queryParameters.push(`available=${formData.available}`);
    }

    // Construct the query string
    const queryString = queryParameters.join("&");

    const res = await axios.get(
      `http://localhost:3000/api/users?${queryString}`
    );
    setUsers(res.data);
  };

  const handleReset = () => {
    setFormData({
      domain: "",
      gender: "",
      available: "",
    });
    fetchUsers();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        mt: 2,
      }}
    >
      <FormControl variant="outlined">
        <InputLabel id="domain-label">Domain</InputLabel>
        <Select
          labelId="domain-label"
          id="domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          label="Domain"
          sx={{ width: 150, mr: 1, ml: 1 }}
        >
          <MenuItem value="Business Development">Business Development</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Management">Management</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="UI Designing">UI Designing</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          label="Gender"
          sx={{ width: 150, mr: 1, ml: 1 }}
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
      <FormControl variant="outlined">
        <InputLabel id="availability-label">Availability</InputLabel>
        <Select
          labelId="availability-label"
          id="available"
          name="available"
          value={formData.available}
          onChange={handleChange}
          label="Availability"
          sx={{ width: 150, mr: 1, ml: 1 }}
        >
          <MenuItem value={true}>Available</MenuItem>
          <MenuItem value={false}>Unavailable</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={handleSearch} sx={{ mr: 1, ml: 1 }}>
        Filter
      </Button>
      <Button variant="outlined" onClick={handleReset} sx={{ mr: 1, ml: 1 }}>
        Reset
      </Button>
    </Box>
  );
}
