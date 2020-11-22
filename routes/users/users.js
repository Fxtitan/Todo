var express = require("express");
const router = express.Router();

//Destructured
//this is connected to my controller to take the functions from it and use them here.
var {createUser, signIn} = require("./userController");

/* GET users listing. */
router.get("/test", (req, res) => {
    res.send("yea I work 🤷🏾‍♂️");
});

router.post("/create-user", createUser);

router.post("/sign-in", signIn);

module.exports = router;
