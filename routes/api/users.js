const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  // the below line is the error part of the function (pre-callback) -- in this case just an array
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // see if user exists -- we can use await because we're in async
      let user = await User.findOne({ email: email });
      // let user = await User.findOne({ email }) (I'm not sure why this one works)

      if (user) {
        // have to have the return or it will try to keep moving thru the code
        return res.status(400).json({ errors: { msg: "User already exists" } });
      }

      // get user's gravatar
      const avatar = gravatar.url(email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default image
      });

      // again for some reason you don't need to double-write these things.
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // encrypt password
      const salt = await bcrypt.genSalt(10); // 10 "rounds" is recommended amt

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // create payload for jwt
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      // return jsonwebtoken
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
