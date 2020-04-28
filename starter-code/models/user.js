const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating schema
const userSchema = new Schema({
    username: {type: String, required: true},
    password: {type: String, required: true}
})

// create user model:
const User = mongoose.model("User", userSchema);

// export!!
module.exports = User;