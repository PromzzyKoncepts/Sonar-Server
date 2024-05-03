const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  token: {
    type: String,
  },
});

user.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(user.password, 8);

  const { _id, firstName, email } = user;

  var token = await jwt.sign(
    {
      _id,
      firstName,
      email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: 3600000 }
  );
  user.token = token;
  next();
});

module.exports = User = mongoose.model("User", user);
