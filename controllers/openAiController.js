const { getCarAssistantResponse } = require("../services/openAIService")

exports.getResponse = async (req, res) => {
  try {
    const { userMessage, make, model, year } = req.body

    // לוגים לדיבוג
    console.log("Received request:", {
      userMessage,
      make,
      model,
      year,
    })

    // וידוא שכל הפרמטרים הנדרשים קיימים
    if (!userMessage || !make || !model || !year) {
      return res.status(400).json({
        message: "Missing required fields",
        received: { userMessage, make, model, year },
      })
    }

    // שליחת השאלה ל-OpenAI ישירות עם הפרמטרים שהתקבלו
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
    res.status(500).json({
      message: "Server error",
      details: error.message,
    })
  }
}
