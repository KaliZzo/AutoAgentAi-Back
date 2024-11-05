const mongoose = require("mongoose")
const connectDB = require("./config/db") // מניחים שהחיבור מוגדר ב-db.js
const User = require("./models/User")
const Car = require("./models/Car")
const Maintenance = require("./models/Maintenance")

// התחברות למסד הנתונים
connectDB()

// בדיקת יצירת משתמש חדש
const testUser = async () => {
  try {
    const user = await User.create({
      username: "testUs334er",
      email: "testuserw3@example.com",
      password: "passwo34rd123",
    })
    console.log("User created:", user)
    return user
  } catch (error) {
    console.error("Error creating user:", error.message)
  }
}

// בדיקת יצירת רכב חדש
const testCar = async (userId) => {
  try {
    const car = await Car.create({
      Make: "Toyota",
      Model: "Corolla",
      Year: 2020,
      userId: userId,
    })
    console.log("Car created:", car)
    return car
  } catch (error) {
    console.error("Error creating car:", error.message)
  }
}

// בדיקת יצירת תחזוקה חדשה
const testMaintenance = async (carId, userId) => {
  try {
    const maintenance = await Maintenance.create({
      carId: carId,
      userId: userId,
      maintenanceType: "oil change",
      dateScheduled: new Date(),
    })
    console.log("Maintenance created:", maintenance)
  } catch (error) {
    console.error("Error creating maintenance:", error.message)
  }
}

// הפעלת הבדיקות
const runTests = async () => {
  const user = await testUser()
  if (user) {
    const car = await testCar(user._id)
    if (car) {
      await testMaintenance(car._id, user._id)
    }
  }
  mongoose.connection.close() // סגירת החיבור לאחר סיום הבדיקות
}

runTests()
