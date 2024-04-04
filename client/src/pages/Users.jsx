import { CssBaseline } from "@mui/material";
import NavBar from "../components/NavBar";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Users() {
  const [users, setUsers] = useState(["lol"]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:3000/api/users");
    setUsers((oldUsers) => {
      return res.data;
    });
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {users.length === 0 ? (
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
          users.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })
        )}
      </div>
    </>
  );
}
