//Require Dependencies
const express = require("express");
const router = express.Router();

//Require controllers
const teams = require("../controllers/teams.js");

//Routes
router.get("/", teams.getTeams);

router.get("/:id", teams.getTeam);

router.post("/", teams.createTeam);

module.exports = router;
