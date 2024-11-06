const express = require("express")
const router = express.Router()
const maintenanceController = require("./../controllers/maintenanceController")

router.post("/addMaintenance", maintenanceController.addMaintenance)

router.get(
  "/getMaintenanceRecords/:carId",
  maintenanceController.getMaintenanceRecords
)
router.put(
  "/updateMaintenance/:maintenanceId",
  maintenanceController.updateMaintenance
)

router.delete(
  "/deleteMaintenance/:maintenanceId",
  maintenanceController.deleteMaintenance
)
module.exports = router
