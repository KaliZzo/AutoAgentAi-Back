const axios = require("axios")
const dotenv = require("dotenv")
dotenv.config({ path: require("path").join(__dirname, "../config.env") })

const geocodeLocation = async (location) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    location
  )}&key=${apiKey}`

  const response = await axios.get(url)

  if (response.data.results.length === 0) {
    throw new Error("Location not found")
  }

  const { lat, lng } = response.data.results[0].geometry.location
  return { latitude: lat, longitude: lng }
}

const getNearbyGarages = async (location) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&keyword=garage&type=car_repair&language=en&key=${apiKey}`

  console.log("Request URL:", url) // הדפסת URL לבדיקה

  const response = await axios.get(url)

  if (response.data.status !== "OK") {
    console.error("Error from Google Maps API:", response.data)
    throw new Error(`Google Maps API Error: ${response.data.status}`)
  }

  return response.data.results
}

module.exports = { geocodeLocation, getNearbyGarages }
