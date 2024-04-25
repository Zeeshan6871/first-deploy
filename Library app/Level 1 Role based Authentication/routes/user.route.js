const express = require("express");
const { registerUser } = require("../controller/user.controller");
const userModel = require("../model/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.post("/register", registerUser);

userRouter.post("/login", async (req, res) => {
  // const header = req.headers?.authorization;
  // const token = header.split(" ")[1];
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    // console.log(user);
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw new Error(err.message);
        if (result) {
          jwt.sign(
            { userId: user._id, role: user.role, username: user.username },
            process.env.SECRET_KEY,
            (err, token) => {
              if (err) throw new Error(err.message);
              res
                .status(200)
                .json({ msg: "Log in Successfully", accessToken: token });
            }
          );
        } else {
          res.status().json({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(404).json({ msg: "User not Found Please Login" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
});

module.exports = {
  userRouter,
};
