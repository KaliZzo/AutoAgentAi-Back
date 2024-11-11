const express = require("express")
const router = express.Router()
const googleMapsController = require("../controllers/googleMapsController")
const jwtMiddleware = require("../middleware/jwtHandler")

router.get("/garages", jwtMiddleware, googleMapsController.findNearbyGarages)
router.get(
  "/photo/:photoReference",
  jwtMiddleware,
  googleMapsController.getPlacePhoto
)

module.exports = router
