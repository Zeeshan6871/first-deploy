const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

const registerUser = async (req, res) => {
  const { _id, email, username, password, role } = req.body;
  try {
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res
        .status(401)
        .json({ msg: "User is Already registered. Please login!" });
    }
    bcrypt.hash(password, 10, async (err, data) => {
      if (err) throw new Error(err);
      const user = new userModel({
        _id,
        username,
        password: data,
        email,
        role,
      });
      await user.save();
      res.status(201).json({ msg: "Registerd Successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

const loginUser = async (req, res) => {
  const token = req.headers.authorization;
  try {
  } catch (error) {}
};

module.exports = {
  registerUser,
};
