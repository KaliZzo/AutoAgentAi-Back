const Maintenance = require("./../models/Maintenance")

//Add Maintence reminder to the Platfrom
exports.addMaintenance = async (req, res) => {
  try {
    const {
      carId,
      maintenanceType,
      dateScheduled,
      dateCompleted,
      cost,
      notes,
    } = req.body

    // שימוש ב־userId מתוך ה־JWT
    const userId = req.user.id

    const maintenance = await Maintenance.create({
      carId,
      userId, // ה-userId מתווסף אוטומטית מה־JWT
      maintenanceType,
      dateScheduled,
      dateCompleted, // לא חובה, אם לא מסופק יישאר null
      cost,
      notes,
    })

    res.status(201).json({
      message: "Maintenance record added successfully",
      maintenance,
    })
  } catch (error) {
    console.error("Error adding maintenance record:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Get recond of Maintence(After I added it )
exports.getMaintenanceRecords = async (req, res) => {
  try {
    const { carId } = req.params

    // חיפוש רשומות תחזוקה לפי carId ו־userId של המשתמש המחובר
    const records = await Maintenance.find({ carId, userId: req.user.id })
    console.log("Fetching maintenance records for carId:", carId)

    res.status(200).json({
      message: "Maintenance records fetched successfully",
      records,
    })
  } catch (error) {
    console.error("Error fetching maintenance records:", error)
    res.status(500).json({ message: "Server error" })
  }
}
//Update or Change detalis about the Mintenance
exports.updateMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params
    const {
      maintenanceType,
      dateScheduled,
      dateCompleted,
      cost,
      notes,
      status,
    } = req.body

    // חיפוש ועדכון הרשומה על בסיס maintenanceId ו־userId מה־JWT
    const maintenance = await Maintenance.findOneAndUpdate(
      { _id: maintenanceId, userId: req.user.id },
      {
        maintenanceType,
        dateScheduled,
        dateCompleted,
        cost,
        notes,
        status,
      },
      { new: true } // מחזיר את הרשומה המעודכנת
    )

    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" })
    }

    res.status(200).json({
      message: "Maintenance record updated successfully",
      maintenance,
    })
  } catch (error) {
    console.error("Error updating maintenance record:", error)
    res.status(500).json({ message: "Server error" })
  }
}

//Delete Maintenance
exports.deleteMaintenance = async (req, res) => {
  try {
    const { maintenanceId } = req.params

    // מחפש ומוחק את הרשומה רק אם היא שייכת ל-userId של המשתמש המחובר
    const maintenance = await Maintenance.findOneAndDelete({
      _id: maintenanceId,
      userId: req.user.id,
    })

    if (!maintenance) {
      return res.status(404).json({ message: "Maintenance record not found" })
    }

    res.status(200).json({
      message: "Maintenance record deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting maintenance record:", error)
    res.status(500).json({ message: "Server error" })
  }
}
