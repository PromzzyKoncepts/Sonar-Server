require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../db/models/user");
const PersonalInfo = require("../../db/models/UserDetails");
const checkAuth = require("../middleware/auth");

const router = express.Router();

router.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// Post request ********** CHECK USER EXIST IN DATABASE ****************

router.post("/login", (req, res) => {
  let { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      const isPasswordMatch = bcrypt.compare(password, user.password);

      if (user && isPasswordMatch) {
        res.status(200).json({
          message: "logged in successfully",

          token: user.token,
        });
      } else if (!isPasswordMatch) {
        res.status(401).json({
          message: "Invalid Password",
        });
      } else {
        res.status(404).json({
          error: "User not found",
        });
      }
    })

    .catch((err) => {
      console.log(err);

      res.status(500).json({
        error: err,
      });
    });
});

// Post request ********** INSERT USER IN DATABASE ****************

router.post("/register", (req, res) => {
  let { firstName, password, email } = req.body;

  let user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    password,
    email,
    token: "",
  });

  User.findOne({ email })
    .exec()
    .then((userRecordExist) => {
      if (!userRecordExist) {
        user
          .save()

          .then(async (result) => {
            res.status(201).json({
              message: "User Saved in database",
              firstname: result.firstName,
              email: result.email,
              token: result.token,
            });
          })

          .catch((err) => {
            if ((err.name = "ValidationError")) {
              res.status(400).json({
                error: err.message,
              });
            } else {
              res.status(500).json({
                error: err,
              });
            }
          });
      } else {
        res.status(409).json({
          message: "email already exist",
        });
      }
    })

    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }).exec();
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(401).json({ error: "Invalid password" });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: "1h",
//     });

//     res.status(200).json({
//       message: "Logged in successfully",
//       token: token,
//       email: email,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/info", async (req, res) => {
  try {
    const { phoneContact, location, distance, timeTaken } = req.body;
    const token = req.headers.token;

    // Verify the JWT token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: err });
      }

      // Token is valid, extract user ID from decoded token
      const userId = decoded._id;
      console.log(decoded);

      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: err });
      }

      // Create a new personal info object
      const personalInfo = new PersonalInfo({
        userId,
        phoneContact,
        location,
        distance,
        timeTaken,
      });

      // Save the personal info to the database
      await personalInfo.save();

      res.status(201).json({
        message: "Personal information submitted successfully",
        personalInfo,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// acesss any api

router.get("/access", checkAuth, (req, res) => {
  res.status(200).json({
    message: "access granted",

    user: req.userData,
  });
});

router.get("/info", checkAuth, async (req, res) => {
  try {
    // Extract user ID from decoded JWT token
    const userId = req.userData._id;

    // Find the user in the database
    const user = await User.findById(userId).exec();
    //   const info = await PersonalInfo.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find personal info for the user
    const personalInfo = await PersonalInfo.findOne({ userId: userId }).exec();
    console.log(personalInfo);

    if (!personalInfo) {
      return res.status(404).json({ error: "Personal info not found" });
    }

    // Here you can extract whatever personal info you need from the user object
    const userInfo = {
      firstName: user.firstName,
      email: user.email,
      phone: personalInfo.phoneContact,
      distance: personalInfo.distance,
      timeTaken: personalInfo.timeTaken,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
