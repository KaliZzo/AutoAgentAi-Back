const {
  geocodeLocation,
  getNearbyGarages,
} = require("../services/googleMapsService")

exports.findNearbyGarages = async (req, res) => {
  try {
    let { location, latitude, longitude } = req.query

    if (location) {
      // המרה של מיקום בכתב לקואורדינטות
      const coordinates = await geocodeLocation(location)
      latitude = coordinates.latitude
      longitude = coordinates.longitude
    }

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({
          message:
            "Please provide either a location name or latitude and longitude",
        })
    }

    const coordinates = `${latitude},${longitude}`
    const garages = await getNearbyGarages(coordinates)

    res.status(200).json({
      message: "Nearby garages fetched successfully",
      garages,
    })
  } catch (error) {
    console.error("Error fetching nearby garages:", error)
    res.status(500).json({ message: "Server error" })
  }
}
