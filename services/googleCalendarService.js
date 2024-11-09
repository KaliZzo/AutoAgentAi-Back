const { google } = require("googleapis")
const { OAuth2 } = google.auth
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "../config.env") })

class GoogleCalendarService {
  constructor() {
    this.oauth2Client = new OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "http://localhost:3000/api/v1/calendar/auth/callback"
    )
  }

  getAuthURL() {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: ["https://www.googleapis.com/auth/calendar"],
    })
  }

  async getTokens(code) {
    const { tokens } = await this.oauth2Client.getToken(code)
    return tokens
  }

  async addEventToCalendar(tokens, eventDetails) {
    try {
      this.oauth2Client.setCredentials(tokens)

      const calendar = google.calendar({
        version: "v3",
        auth: this.oauth2Client,
      })

      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: eventDetails,
      })

      return response.data
    } catch (error) {
      console.error("Calendar service error:", error)
      throw error
    }
  }
}

module.exports = new GoogleCalendarService()
