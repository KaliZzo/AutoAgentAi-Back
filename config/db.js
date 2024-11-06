const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({ path: require("path").join(__dirname, "../config.env") })

//Connect to the Database
const DB = process.env.MONGO_DB

const connectDB = async () => {
  try {
    await mongoose.connect(DB)
    console.log("MongoDB Database Connected")
  } catch (error) {
    console.error("Error connection to MongoDB", error)
  }
}

//Export Database Model
module.exports = connectDB
