import { Typography, Box, Card, CardContent, CssBaseline } from "@mui/material";
import UserCard from "../components/UserCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function SingleTeam() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [team, setTeam] = useState({});

  const fetchTeam = async () => {
    const res = await axios.get(`http://localhost:3000/api/team/${id}`);
    setTeam(res.data);
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Box>
        <Box sx={{ mt: 7, ml: 20, mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }} gutterBottom>
            Team Details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Team ID: {team.id}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Team Name: {team.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Members:
          </Typography>
        </Box>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {team.users &&
            team.users.map((user) => <UserCard user={user} key={user.id} />)}
        </div>
      </Box>
    </>
  );
}
