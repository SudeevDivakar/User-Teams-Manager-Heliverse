//Requiring models
const Team = require("../models/teamSchema.js");
const User = require("../models/userSchema.js");
const asyncHandler = require("express-async-handler");

const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  res.json(teams);
});

const getTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const team = await Team.findOne({ id: id });
  if (!team) {
    res.status(404);
    throw new Error("TEAM NOT FOUND");
  } else {
    const usersDetails = [];
    for (let userId of team.users) {
      const user = await User.findOne({ id: userId });
      if (!user) {
        continue;
      } else {
        usersDetails.push(user);
      }
    }
    res.json({ id: id, name: team.name, users: usersDetails });
  }
});

const createTeam = asyncHandler(async (req, res) => {
  const { id, name, users } = req.body;

  // Check if any of the users are not present in the User Model
  for (const userId of users) {
    const user = await User.find({ id: userId });
    if (user.length === 0) {
      return res.json({
        error: true,
        message: `User with ID ${userId} not present in database`,
      });
    }
  }

  // Check if the team ID is already taken
  const isTeamIdPresent = await Team.findOne({ id: id });
  if (isTeamIdPresent) {
    return res.json({
      error: true,
      message: "Team ID already taken",
    });
  }

  // Check if the team name is already taken
  const isTeamNamePresent = await Team.findOne({ name: name });
  if (isTeamNamePresent) {
    return res.json({
      error: true,
      message: "Team Name already taken",
    });
  }

  // All checks passed, create the team
  const team = await Team.create({
    id: id,
    name: name,
    users: users,
  });

  res.json(team);
});

module.exports = { getTeams, createTeam, getTeam };
