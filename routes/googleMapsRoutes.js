const express = require("express")
const router = express.Router()
const googleMapsController = require("./../controllers/googleMapsController")

router.get("/garages", googleMapsController.findNearbyGarages)

module.exports = router
