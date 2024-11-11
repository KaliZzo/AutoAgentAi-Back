const axios = require("axios")
const {
  geocodeLocation,
  getNearbyGarages,
  getPlaceDetails,
} = require("../services/googleMapsService")

//Controller to find Near By me Garages to fix the car.
exports.findNearbyGarages = async (req, res) => {
  try {
    let { location } = req.query

    if (!location) {
      return res.status(400).json({
        message: "Please provide a location",
      })
    }

    const coordinates = await geocodeLocation(location)
    const garagesData = await getNearbyGarages(
      `${coordinates.latitude},${coordinates.longitude}`
    )

    // קבלת פרטים נוספים לכל מוסך
    const detailedGarages = await Promise.all(
      garagesData.map(async (garage) => {
        try {
          const details = await getPlaceDetails(garage.place_id)
          return { ...garage, ...details }
        } catch (error) {
          console.error(`Error fetching details for ${garage.name}:`, error)
          return garage
        }
      })
    )

    res.status(200).json({
      message: "Nearby garages fetched successfully",
      garages: detailedGarages,
    })
  } catch (error) {
    console.error("Error fetching nearby garages:", error)
    res.status(500).json({ message: "Error fetching garages" })
  }
}

exports.getPlacePhoto = async (req, res) => {
  try {
    const { photoReference } = req.params
    const apiKey = process.env.GOOGLE_MAPS_API_KEY

    // שינוי - במקום להשתמש ב-stream, נחזיר את ה-URL ישירות
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`

    res.json({ photoUrl })
  } catch (error) {
    console.error("Error with photo URL:", error)
    res.status(500).json({ message: "Error with photo URL" })
  }
}
