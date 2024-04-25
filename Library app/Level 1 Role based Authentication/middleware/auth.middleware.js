const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  try {
    const header = req.headers?.authorization;
    const token = header.split(" ")[1];
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) throw new Error(err.message);
        const { userId, role, username } = decode;
        // console.log(decode);
        req.role = role;
        req.body.authorID = userId;
        req.body.author = username;
        next();
      });
    } else {
      res.send("Please login first");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
