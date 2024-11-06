const express = require("express")
const router = express.Router()
const maintenanceController = require("./../controllers/maintenanceController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.post(
  "/addMaintenance",
  jwtMiddleware,
  maintenanceController.addMaintenance
)

router.get(
  "/getMaintenanceRecords/:carId",
  jwtMiddleware,
  maintenanceController.getMaintenanceRecords
)
router.put(
  "/updateMaintenance/:maintenanceId",
  jwtMiddleware,
  maintenanceController.updateMaintenance
)

router.delete(
  "/deleteMaintenance/:maintenanceId",
  jwtMiddleware,
  maintenanceController.deleteMaintenance
)
module.exports = router
