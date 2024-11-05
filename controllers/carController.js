const Car = require("../models/Car")

exports.addCar = async (req, res) => {
  try {
    const { make, model, year, userId } = req.body

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

exports.updateCar = async (req, res) => {
  try {
    const { carId } = req.params
    const { make, model, year, userId } = req.body // userId מועבר ישירות מהגוף של הבקשה לצורך בדיקות

    const car = await Car.findOneAndUpdate(
      { _id: carId, userId: userId }, // שימוש ב-userId מהבקשה במקום req.user._id
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

exports.deleteCar = async (req, res) => {
  try {
    const { carId } = req.params
    const { userId } = req.body

    const car = await Car.findOneAndDelete({ _id: carId, userId: userId })

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

exports.getAllCars = async (req, res) => {
  try {
    const userId = req.query.userId
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" })
    }

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

exports.getOneCar = async (req, res) => {
  try {
    const { carId } = req.params
    const userId = req.query.userId

    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" })
    }

    const car = userId
      ? await Car.findOne({ _id: carId, userId })
      : await Car.findById(carId)

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
