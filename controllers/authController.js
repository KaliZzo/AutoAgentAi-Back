const User = require("./../models/User")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const { send2FACode, sendPasswordReset } = require("../utils/sendEmail")
const generate2FACode = require("../utils/generate2FACode")
const { dataplex } = require("googleapis/build/src/apis/dataplex")

dotenv.config({ path: require("path").join(__dirname, "../config.env") })

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

    //Create JWT Token:
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(201).json({
      message: "User registered successfully",
      user: {
        token,
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

    // Create JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(200).json({
      message: "Login successful",
      user: {
        token,
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

//Send 2FA code to your email
exports.request2FA = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select("+password")

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const code = generate2FACode()
    user.temp2FACode = code
    user.temp2FACodeExpiry = Date.now() + 2 * 60 * 1000 // תקף ל2 דקות
    await user.save()

    await send2FACode(user.email, code)
    res.status(200).json({ message: "2FA code sent to your email" })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

//Make sure the 2FA code that you get into your email it's true
exports.verify2FA = async (req, res) => {
  try {
    const { userId, code } = req.body

    // חפש את המשתמש לפי ID
    const user = await User.findById(userId).select(
      "+temp2FACode +temp2FACodeExpiry"
    )

    // בדוק אם המשתמש נמצא
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // בדוק אם הקוד תואם
    if (user.temp2FACode.trim() !== code.trim()) {
      return res.status(400).json({ message: "Invalid 2FA code" })
    }

    // בדוק אם תוקף הקוד לא פג
    if (user.temp2FACodeExpiry < Date.now()) {
      return res.status(400).json({ message: "2FA code has expired" })
    }

    // נקה את הקוד כדי שלא יוכל לשמש שוב
    user.temp2FACode = undefined
    user.temp2FACodeExpiry = undefined
    await user.save()

    // שלח תגובה אם הקוד נכון
    res.status(200).json({ message: "2FA verified successfully" })
  } catch (error) {
    console.error("Error in verify2FA:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body // וודא שזה נמצא בתחילת הקוד
    if (!email) {
      return res.status(400).json({ message: "Email is required" })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const resetToken = crypto.randomBytes(32).toString("hex")

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex")
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000 // תוקף ל-10 דקות

    await user.save()

    const resetURL = `http://localhost:3000/api/v1/reset-password/${resetToken}`
    await sendPasswordReset(email, resetURL)

    res.status(200).json({ message: "Password reset link sent to your email." })
  } catch (error) {
    console.error("Error in forgotPassword:", error)
    res.status(500).json({ message: "Server error" })
  }
}

exports.resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex")

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    })

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token is invalid or has expired" })
    }
    user.password = await bcrypt.hash(password, 10)
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()

    res.status(200).json({ message: "Password reset successful" })
  } catch (error) {
    console.error("error is resetPassword:", error)
    res.status(500).json({ message: "Server error" })
  }
}
