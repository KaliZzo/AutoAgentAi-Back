const googleCalendarService = require("../services/googleCalendarService")

// הפונקציה להפנייה לעמוד ההרשאות
exports.getAuthURL = (req, res) => {
  const url = googleCalendarService.getAuthURL()
  res.json({ url })
}

// הפונקציה לחילוץ ה-token לאחר אישור
exports.getTokens = async (req, res) => {
  try {
    const { code } = req.query
    const tokens = await googleCalendarService.getTokens(code)
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tokens", error })
  }
}

// הפונקציה להוספת אירוע ללוח השנה
exports.addEvent = async (req, res) => {
  try {
    const event = req.body
    const calendarEvent = await googleCalendarService.addEventToCalendar(event)
    res.json(calendarEvent)
  } catch (error) {
    res.status(500).json({ message: "Error adding event to calendar", error })
  }
}
