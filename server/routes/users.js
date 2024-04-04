//Require Dependencies
const express = require("express");
const router = express.Router();

//Require controllers
const users = require("../controllers/users.js");

//Require validations
const { validateUser } = require("../middleware.js");

//Routes
router.get("/", users.getAllUsers);

router.get("/:id", users.getUser);

router.post("/", validateUser, users.addUser);

router.put("/:id", validateUser, users.updateUser);

router.delete("/:id", users.removeUser);

module.exports = router;
