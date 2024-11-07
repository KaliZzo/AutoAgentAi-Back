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

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: '"AutoAgent" <noreply@autoagent.com>', // שם ושולח מייל מותאם
    to,
    subject,
    text,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${to}`)
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email")
  }
}

module.exports = sendEmail
