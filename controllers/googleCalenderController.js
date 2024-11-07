const googleCalendarService = require("../services/googleCalendarService")

//Function to get acces into my google calnder account.
exports.getAuthURL = (req, res) => {
  const url = googleCalendarService.getAuthURL()
  res.json({ url })
}

//After accept my google account in the platform that's the Controller I get the token to add a event to the calender.
exports.getTokens = async (req, res) => {
  try {
    const { code } = req.query
    const tokens = await googleCalendarService.getTokens(code)
    res.json(tokens)
  } catch (error) {
    res.status(500).json({ message: "Error retrieving tokens", error })
  }
}

//Function to add the Evenet to the Calnder
exports.addEvent = async (req, res) => {
  try {
    const event = req.body
    const calendarEvent = await googleCalendarService.addEventToCalendar(event)
    res.json(calendarEvent)
  } catch (error) {
    res.status(500).json({ message: "Error adding event to calendar", error })
    console.log(error)
  }
}
