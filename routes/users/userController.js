//A library to help you hash passwords.
var bcrypt = require("bcryptjs");

var User = require("./User");

//something like a URL-safe, used for protection.
var jwt = require("jsonwebtoken");

//why exactly do we have to do this?
module.exports = {
  createUser: async (req, res) => {
    try {
      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(req.body.password, genSalt);
      let createdUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      await createdUser.save();

      res.json({
        message: "User created",
      });
    } catch (e) {
      if (e.code === 11000) {
        res.status(409).json({
          message: "Email is duplicate",
        });
      } else {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    }
  },
  
  signIn: async (req, res) => {
    try {
      //check if email exist
      let foundEmail = await User.findOne({email: req.body.email});
      if (!foundEmail) {
        throw {message: "No user found, please sign up!", status: 404};
        //throw new Error("No user, please sign up!");
      } else {
        let comparedPassword = await bcrypt.compare(
          req.body.password,
          foundEmail.password
        );

        if (!comparedPassword) {
          throw {
            message: "Please check your email and password",
            status: 401,
          };
        }

        var token = jwt.sign(
          {email: foundEmail.email, _id: foundEmail._id},
          "hamsteroverlord007",
          {expiresIn: "1h"}
        );

        res.json({
          jwtToken: token,
        });
      }
    } catch (e) {
      console.log(e);

      if (e.status === 404) {
        res.status(e.status).json({
          message: e.message,
        });
      } else if (e.status === 401) {
        res.status(e.status).json({
          message: e.message,
        });
      } else {
        res.status(500).json({
          message: e.message,
        });
      }
    }
  },
};
