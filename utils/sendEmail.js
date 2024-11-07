const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "../config.env") })

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
})

const send2FACode = async (email, code) => {
  try {
    await transporter.sendMail({
      from: '"AutoAgent" <no-reply@autoagent.com>',
      to: email,
      subject: "Your 2FA Code",
      text: `Your verification code is: ${code}`,
    })
    console.log("2FA code sent to:", email)
  } catch (error) {
    console.error("Error sending 2FA code:", error)
  }
}

module.exports = { send2FACode }
