const User = require("./../models/User")
const bcrypt = require("bcrypt")

//SignUp User to the Platfrom
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    })
  } catch (error) {
    console.error("Error in signup:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Login User to the Platfrom
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email }).select("+password")

    if (!user) {
      return res.status(500).json({ message: "invalid email or password" })
    }

    const isMatchedPassword = await bcrypt.compare(password, user.password)
    if (!isMatchedPassword) {
      return res.status(500).json({ message: "invalid email or password" })
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    })
  } catch (error) {
    console.error("Error in login:", error)
    res.status(500).json({ message: "Server error" })
  }
}
