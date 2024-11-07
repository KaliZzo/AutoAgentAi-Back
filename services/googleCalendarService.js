const { google } = require("googleapis")
const { OAuth2 } = google.auth
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "../config.env") })

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/api/v1/calendar/auth/callback" // ה-redirect URI שהגדרת
)

// הפונקציה להפניית המשתמש לעמוד ההרשאות של Google
const getAuthURL = () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar"], // ההרשאה לגישה ללוח השנה
  })
  return authUrl
}

// פונקציה לחילוץ ה-token לאחר אישור
const getTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  return tokens
}

// פונקציה להוספת אירוע ללוח השנה
const addEventToCalendar = async (event) => {
  const calendar = google.calendar({ version: "v3", auth: oauth2Client })
  const response = await calendar.events.insert({
    calendarId: "primary", // לוח השנה הראשי של המשתמש
    resource: event,
  })
  return response.data
}

// פונקציה להוספת רשומת תחזוקה ליומן Google Calendar
const addExistingMaintenanceToCalendar = async (maintenance) => {
  const calendar = google.calendar({ version: "v3", auth: oauth2Client })

  const event = {
    summary: `Maintenance: ${maintenance.maintenanceType}`,
    description: maintenance.notes || "Scheduled Maintenance",
    start: {
      dateTime: maintenance.dateScheduled.toISOString(),
      timeZone: "Asia/Jerusalem", // אזור הזמן המתאים
    },
    end: {
      dateTime: new Date(
        new Date(maintenance.dateScheduled).getTime() + 60 * 60 * 1000
      ).toISOString(),
      timeZone: "Asia/Jerusalem",
    },
  }

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  })

  return response.data
}

module.exports = {
  getAuthURL,
  getTokens,
  addEventToCalendar,
  addExistingMaintenanceToCalendar,
}
