const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decode = jwt.verify(req.headers.token, process.env.ACCESS_TOKEN_SECRET);

    req.userData = decode;

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Authentication has Failed",
    });
  }
};
