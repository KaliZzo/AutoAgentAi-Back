const mongoose = require("mongoose")

const maintenanceSchema = new mongoose.Schema(
  {
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car", // קישור למודל הרכב
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // קישור למודל המשתמש
      required: true,
    },
    maintenanceType: {
      type: String,
      required: [true, "Maintenance type is required"],
      enum: [
        "oil change",
        "tire rotation",
        "brake inspection",
        "general inspection",
        "Scheduled Maintenance",
      ], // סוגי טיפולים אפשריים
    },
    dateScheduled: {
      type: Date,
      required: [true, "Scheduled date is required"],
    },
    dateCompleted: {
      type: Date,
      default: null, // נשאר ריק עד סיום הטיפול
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "canceled"], // מצב הטיפול
      default: "scheduled",
    },
  },
  { timestamps: true }
)

const Maintenance = mongoose.model("Maintenance", maintenanceSchema)

module.exports = Maintenance
