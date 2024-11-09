const express = require("express")
const router = express.Router()
const maintenanceController = require("./../controllers/maintenanceController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.post(
  "/addMaintenance",
  jwtMiddleware,
  maintenanceController.addMaintenance
)

router.post(
  "/:maintenanceId/add-to-calendar",
  jwtMiddleware,
  maintenanceController.addMaintenanceToCalendar
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

router.get(
  "/getAllMaintenanceRecords",
  jwtMiddleware,
  maintenanceController.getAllMaintenanceRecords
)

router.get(
  "/getMaintenance/:maintenanceId",
  jwtMiddleware,
  maintenanceController.getMaintenanceById
)

module.exports = router
