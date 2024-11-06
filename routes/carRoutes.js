const express = require("express")
const router = express.Router()
const carController = require("./../controllers/carController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.post("/addCar", jwtMiddleware, carController.addCar)
router.put("/updateCar/:carId", jwtMiddleware, carController.updateCar)
router.delete("/deleteCar/:carId", jwtMiddleware, carController.deleteCar)
router.get("/getAllCars", jwtMiddleware, carController.getAllCars)
router.get("/getOneCar/:carId", jwtMiddleware, carController.getOneCar)

module.exports = router
