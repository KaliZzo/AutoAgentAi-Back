const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "./../config.env") })

const authenticate = (req, res, next) => {
  //Get token from Header
  const token = req.header("Authorization")?.replace("Bearer ", "")

  // If there is no Token so back an error
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." })
  }

  try {
    // Checking if there is Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // saved the user
    next() //go to the page that the user required
  } catch (error) {
    console.error(error)
    console.log(error)
    res.status(403).json({ message: "Invalid token." })
  }
}

module.exports = authenticate
