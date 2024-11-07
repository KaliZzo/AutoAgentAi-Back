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
  temp2FACode: {
    type: String,
    select: false, // לא לשלוף את הקוד כברירת מחדל
  },
  temp2FACodeExpiry: {
    type: Date,
    select: false, // לא לשלוף את התוקף כברירת מחדל
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
