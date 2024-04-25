const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: { type: Number, require: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["CREATOR", "VIEWER", "VIEW_ALL"],
    default: "VIEW_ALL",
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
