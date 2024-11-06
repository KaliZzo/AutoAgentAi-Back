const { getCarAssistantResponse } = require("../services/openAIService")

//Controller to get Response from ChatGPT as a Assistent
exports.getResponse = async (req, res) => {
  try {
    const { message } = req.body
    const assistantResponse = await getCarAssistantResponse(message)

    res.status(200).json({
      message: assistantResponse,
    })
  } catch (error) {
    res.status(500).json({
      error: "Failed to get response from assistant.",
      message: console.error(error),
    })
  }
}
