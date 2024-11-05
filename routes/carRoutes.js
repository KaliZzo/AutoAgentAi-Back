const express = require("express")
const router = express.Router()
const carController = require("./../controllers/carController")

router.post("/addCar", carController.addCar)
router.put("/updateCar/:carId", carController.updateCar)
router.delete("/deleteCar/:carId", carController.deleteCar)
router.get("/getAllCars", carController.getAllCars)
router.get("/getOneCar/:carId", carController.getOneCar)

module.exports = router
