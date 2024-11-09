const googleCalendarService = require("../services/googleCalendarService")

//Function to get acces into my google calnder account.
exports.getAuthURL = (req, res) => {
  try {
    const url = googleCalendarService.getAuthURL()
    res.json({ url })
  } catch (error) {
    console.error("Auth URL error:", error)
    res.status(500).json({ message: "Error generating auth URL" })
  }
}

//After accept my google account in the platform that's the Controller I get the token to add a event to the calender.
exports.getTokens = async (req, res) => {
  try {
    const { code } = req.query
    const tokens = await googleCalendarService.getTokens(code)
    res.json(tokens)
  } catch (error) {
    console.error("Token error:", error)
    res.status(500).json({ message: "Error retrieving tokens" })
  }
}

//Function to add the Evenet to the Calnder
exports.addEvent = async (req, res) => {
  try {
    const { tokens, ...eventDetails } = req.body

    if (!tokens) {
      return res
        .status(400)
        .json({ message: "Google Calendar tokens are required" })
    }

    // שימוש בפונקציה מהשירות
    const calendarEvent = await googleCalendarService.addEventToCalendar(
      tokens,
      eventDetails
    )
    res.json(calendarEvent)
  } catch (error) {
    console.error("Calendar error:", error)
    res.status(500).json({
      message: "Error adding event to calendar",
      error: error.message,
    })
  }
}
