//Validates data which is useful for:
//Ensuring quality of client submitted data.

//calling in mongoose.
var mongoose = require("mongoose")

//framework of the users input. "this is how I want you to put in this info."
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("User", UserSchema);

//Usually connected to the controller, i.e:
//User.js connected to userController.