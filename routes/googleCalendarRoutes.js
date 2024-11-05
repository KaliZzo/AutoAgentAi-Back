const express = require("express")
const router = express.Router()
const googleCalendarController = require("../controllers/googleCalenderController")

router.get("/auth", googleCalendarController.getAuthURL) // קבלת קישור לעמוד ההרשאות
router.get("/auth/callback", googleCalendarController.getTokens) // קבלת ה-token לאחר אישור
router.post("/add-event", googleCalendarController.addEvent) // הוספת אירוע ללוח השנה

module.exports = router
