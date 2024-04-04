//Import dependencies
const express = require("express");
const mongoose = require("mongoose");

// Used to recieve requests from other servers
const cors = require("cors");

//Require Environment Variables
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//Require routes
const users = require("./routes/users.js");

//Connect to MongoDB
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("DATABASE CONNECTION OPEN");
  })
  .catch(() => {
    console.log("ERROR IN DATABASE CONNECTION");
  });

//Create Express app
const app = express();

//Configure Express app & Other Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users", users);

//Start server
app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
