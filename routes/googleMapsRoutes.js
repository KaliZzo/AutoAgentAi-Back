const express = require("express")
const router = express.Router()
const googleMapsController = require("./../controllers/googleMapsController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.get("/garages", jwtMiddleware, googleMapsController.findNearbyGarages)

module.exports = router
