const express = require("express")
const router = express.Router()
const AuthController = require("./../controllers/authController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)
router.post("/request-2fa", jwtMiddleware, AuthController.request2FA)
router.post("/verify-2fa", AuthController.verify2FA)
router.post("/forgot-password", AuthController.forgotPassword)
router.put("/reset-password/:token", AuthController.resetPassword)

module.exports = router
