import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TeamCard({ team }) {
  const { id, name, users } = team;
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        mt: 2,
        mb: 2,
        minWidth: 290,
        maxWidth: 350,
        borderColor: "#609af7",
        borderRadius: 3,
        px: 1,
        py: 0.5,
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }} component="div">
          Team ID: {id}
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          Team Name: <b style={{ color: "black" }}>{name}</b>
        </Typography>
        <Typography sx={{ mb: 1 }} color="text.secondary">
          Members:{users.length}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate(`/team/${id}`)}
          >
            View Team
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
