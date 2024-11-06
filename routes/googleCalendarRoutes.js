const express = require("express")
const router = express.Router()
const googleCalendarController = require("../controllers/googleCalenderController")

router.get("/auth", googleCalendarController.getAuthURL) //Step 1 get access to google account
router.get("/auth/callback", googleCalendarController.getTokens) // Step 2 Get Token Access
router.post("/add-event", googleCalendarController.addEvent) // Step 3 Add the Event

module.exports = router
