const Car = require("../models/Car")

//Add Your Car on the Platfrom
exports.addCar = async (req, res) => {
  try {
    const { make, model, year } = req.body
    const userId = req.user.id // משיגים את ה-userId מתוך ה-Token המאומת

    const car = await Car.create({
      make,
      model,
      year,
      userId,
    })

    res.status(201).json({
      message: "Car added successfully",
      car,
    })
  } catch (error) {
    console.error("Error adding car:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Change the Detalis of Your Car on the Platfrom
exports.updateCar = async (req, res) => {
  try {
    const { carId } = req.params
    const { make, model, year } = req.body // אין צורך ב-userId מהבקשה

    const car = await Car.findOneAndUpdate(
      { _id: carId, userId: req.user.id }, // שימוש ב-userId מתוך ה-JWT
      { make, model, year },
      { new: true }
    )

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    res.status(200).json({
      message: "Car updated successfully",
      car,
    })
  } catch (error) {
    console.error("Error updating car:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Delete Your Car on the Platfrom
exports.deleteCar = async (req, res) => {
  try {
    const { carId } = req.params

    // חיפוש ומחיקה על בסיס ה-userId מתוך ה-JWT
    const car = await Car.findOneAndDelete({ _id: carId, userId: req.user.id })

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    res.status(200).json({
      message: "Car deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting car:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Get all  Your Cars on the Platfrom(Your cars that by your own)
exports.getAllCars = async (req, res) => {
  try {
    // Use userId from the authenticated JWT
    const userId = req.user.id

    const cars = await Car.find({ userId })

    res.status(200).json({
      message: "Cars fetched successfully",
      cars,
    })
  } catch (error) {
    console.error("Error fetching cars:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Get detail about one car
exports.getOneCar = async (req, res) => {
  try {
    const { carId } = req.params

    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" })
    }

    // מציאת הרכב לפי carId ו־userId של המשתמש המאומת
    const car = await Car.findOne({ _id: carId, userId: req.user.id })

    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    res.status(200).json({
      message: "Car fetched successfully",
      car,
    })
  } catch (error) {
    console.error("Error fetching car:", error)
    res.status(500).json({ message: "Server error" })
  }
}
