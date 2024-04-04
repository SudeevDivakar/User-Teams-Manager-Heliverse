const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  first_name: String,
  last_name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    enum: [
      "Agender",
      "Bigender",
      "Female",
      "Genderfluid",
      "Genderqueer",
      "Male",
      "Non-binary",
      "Polygender",
    ],
  },
  domain: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  avatar: String,
});

module.exports = mongoose.model("User", userSchema);
