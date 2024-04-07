//Requiring models
const Team = require("../models/teamSchema.js");
const asyncHandler = require("express-async-handler");

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

const getTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const team = await Team.find({ id: id });
  if (team.length === 0) {
    res.status(404);
    throw new Error("USER NOT FOUND");
  } else {
    res.json(team);
  }
});

const createTeam = asyncHandler(async (req, res) => {
  const { id, name, users } = req.body;

  try {
    const isTeamIdPresent = await Team.find({ id: id });
    const isTeamNamePresent = await Team.find({ name: name });

    if (isTeamIdPresent.length === 0) {
      if (isTeamNamePresent.length === 0) {
        const team = await Team.create({
          id: id,
          name: name,
          users: users,
        });
        res.json(team);
      } else {
        res.status(400);
        throw new Error("TEAM NAME ALREADY TAKEN");
      }
    } else {
      res.status(400);
      throw new Error("TeamID ALREADY TAKEN");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = { getTeams, createTeam, getTeam };
