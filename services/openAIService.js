const { OpenAI } = require("openai")
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "../config.env") })

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_APIKEY,
})

const getCarAssistantResponse = async (userMessage, make, model, year) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `The question is about a ${make} ${model} ${year}. You are AutoAgent, a highly knowledgeable and professional car assistant. You provide expert advice, solutions, and answers to all questions and issues related to cars of all makes and models. This includes diagnosing malfunctions, solving problems, answering general inquiries, and offering step-by-step tutorials for features like connecting to Bluetooth. Always provide clear, detailed explanations and guidance to help the user understand and resolve their concerns.`,
        },
        { role: "user", content: userMessage },
      ],
      // max_tokens: 100
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error("Error getting response from OpenAI", error)
    throw new Error("Failed to get response from assistant")
  }
}

module.exports = {
  getCarAssistantResponse,
}
