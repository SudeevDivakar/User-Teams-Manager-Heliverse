import { CssBaseline, Typography, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import SearchFilter from "../components/SearchFilter";
import NameSearch from "../components/NameSearch";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 20; // Number of users per page

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsers(res.data);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Calculate users to display on current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <SearchFilter fetchUsers={fetchUsers} setUsers={setUsers} />
      <NameSearch setUsers={setUsers} fetchUsers={fetchUsers} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {currentUsers.length === 0 ? (
          <Typography
            variant="h4"
            color="text.secondary"
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
              mt: "6rem",
            }}
          >
            No Users Found...
          </Typography>
        ) : (
          currentUsers.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })
        )}
      </div>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 4 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
}
