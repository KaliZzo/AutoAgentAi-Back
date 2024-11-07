const express = require("express")
const router = express.Router()
const googleCalendarController = require("../controllers/googleCalenderController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.get("/auth", jwtMiddleware, googleCalendarController.getAuthURL) //Step 1 get access to google account
router.get("/auth/callback", jwtMiddleware, googleCalendarController.getTokens) // Step 2 Get Token Access
router.post("/add-event", jwtMiddleware, googleCalendarController.addEvent) // Step 3 Add the Event

module.exports = router
