const access = (...roles) => {
  return (req, res, next) => {
    // console.log(req.userId);
    if (roles.includes(req.role)) {
      next();
    } else {
      res.json({ msg: "You have no access to this page" });
    }
  };
};

module.exports = access;
