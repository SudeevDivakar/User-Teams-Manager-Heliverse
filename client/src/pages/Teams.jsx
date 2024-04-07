import { CssBaseline, Typography, Box } from "@mui/material";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import TeamCard from "../components/TeamCard";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const teamsPerPage = 20; // Number of teams per page

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const res = await axios.get("http://localhost:3000/api/team");
    setTeams(res.data);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(teams.length / teamsPerPage);

  // Calculate teams to display on current page
  const indexOfLastTeam = currentPage * teamsPerPage;
  const indexOfFirstTeam = indexOfLastTeam - teamsPerPage;
  const currentTeams = teams.slice(indexOfFirstTeam, indexOfLastTeam);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <CssBaseline />
      <NavBar />
      <Typography
        variant="h3"
        sx={{ fontFamily: "Calibri", ml: 7, mt: 3, fontWeight: "bold" }}
      >
        Teams
      </Typography>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {currentTeams.length === 0 ? (
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
            No Teams Found...
          </Typography>
        ) : (
          currentTeams.map((team) => {
            return <TeamCard team={team} key={team.id} />;
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
