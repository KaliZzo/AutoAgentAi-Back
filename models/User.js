const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "You must to have a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide your Email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
