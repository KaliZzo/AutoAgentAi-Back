const express = require("express")
const router = express.Router()
const openAiController = require("./../controllers/openAiController")

router.post("/response", openAiController.getResponse)

module.exports = router
