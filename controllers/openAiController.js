const { getCarAssistantResponse } = require("../services/openAIService")
const Car = require("../models/Car")

//Controller to get Response from ChatGPT as a Assistent
exports.getResponse = async (req, res) => {
  try {
    const { userMessage, carId } = req.body
    const userId = req.user.id // נשלף מה-JWT, וודא שזה מתאים לפורמט הנתונים שלך

    // שליפת פרטי הרכב ואימות שהוא שייך למשתמש
    const car = await Car.findOne({ _id: carId, userId })

    if (!car) {
      return res.status(404).json({
        message: "Car not found or access denied",
      })
    }

    const { make, model, year } = car

    // שליחת השאלה ל-OpenAI
    const assistantResponse = await getCarAssistantResponse(
      userMessage,
      make,
      model,
      year
    )

    res.status(200).json({
      message: "Assistant response fetched successfully",
      response: assistantResponse,
    })
  } catch (error) {
    console.error("Error asking car assistant:", error)
    res.status(500).json({ message: "Server error" })
  }
}
