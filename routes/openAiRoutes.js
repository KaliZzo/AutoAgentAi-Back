const express = require("express")
const router = express.Router()
const openAiController = require("./../controllers/openAiController")
const jwtMiddleware = require("./../middleware/jwtHandler") // Make sure you have JWT to acces to the page you want.

router.post("/response", jwtMiddleware, openAiController.getResponse)

module.exports = router
