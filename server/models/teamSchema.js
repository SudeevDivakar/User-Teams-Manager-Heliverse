const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
