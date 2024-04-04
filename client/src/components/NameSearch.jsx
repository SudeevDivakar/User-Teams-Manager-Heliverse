import { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import axios from "axios";

export default function NameSearch({ setUsers, fetchUsers }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    // Split the search term into first and last names
    const [firstName, lastName] = searchTerm.split(" ");

    let queryParameters = [`first_name=${firstName}`];
    if (lastName !== undefined) {
      queryParameters.push(`last_name=${lastName}`);
    }

    const queryString = queryParameters.join("&");

    // Fetch users based on first and last names
    const res = await axios.get(
      `http://localhost:3000/api/users?${queryString}`
    );
    setUsers(res.data);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchUsers();
  };
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TextField
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: "20%" }}
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{ height: "50%", mr: 1, ml: 1 }}
      >
        Search
      </Button>
      <Button variant="outlined" onClick={handleReset} sx={{ height: "50%" }}>
        Reset
      </Button>
    </Box>
  );
}
