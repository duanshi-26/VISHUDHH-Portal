const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uniqueID: {
    type: String,
    required: true,
    unique: true,
  },
  dashboardType: {
    type: String,
    required: true,
    enum: ["district", "state", "admin"], // Ensures only valid dashboard types
  },
});

module.exports = mongoose.model("User", userSchema);
