const mongoose = require("mongoose");
const User = require("../models/userSchema.js");
const data = require("./seedData.js");

if (process.env.NODE_ENV != "production") {
  require("dotenv").config({ path: "../.env" });
}

mongoose
  .connect(process.env.DB_URL) //connection to mongoDB
  .then(() => {
    console.log("DATABASE CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("ERROR IN DATABASE CONNECTION", err);
  });

async function seedDB() {
  await User.deleteMany({});
  for (let i of data) {
    const user = new User(i);
    await user.save();
  }
}

seedDB().then(() => {
  console.log("DATABASE CONNECTION CLOSED");
  mongoose.connection.close();
});
