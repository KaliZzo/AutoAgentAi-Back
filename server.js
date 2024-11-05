const express = require("express")
const connectDB = require("./config/db")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const AuthRouter = require("./routes/authRoutes")
const CarRouter = require("./routes/carRoutes")
const maintenanceRouter = require("./routes/maintenanceRoutes")
const openAiRouter = require("./routes/openAiRoutes")
const googleMapsRouter = require("./routes/googleMapsRoutes")
const googleCalenderRouter = require("./routes/googleCalendarRoutes")

//DOTENV .ENV
const dotenv = require("dotenv")
dotenv.config({ path: "./config.env" })

//Active Data Base
connectDB()

//EXPRESS AND PORTS
const app = express()
const port = process.env.PORT

//MiddleWares
app.use(express.json())
app.use(cors())
app.use(errorHandler)

//Routes
app.use("/api/v1/", AuthRouter)
app.use("/api/v1/car", CarRouter)
app.use("/api/v1/maintenance", maintenanceRouter)
app.use("/api/v1/autoagent", openAiRouter)
app.use("/api/v1/maps", googleMapsRouter)
app.use("/api/v1/calendar", googleCalenderRouter)

//ACTIVE SERVER
app.listen(port, () => {
  console.log(`The server running on ${port}...`)
})
