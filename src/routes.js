const express = require("express");
const router = express.Router();
const { getLocationList, getWeatherByCity } = require("./functions");

// Define routes for the application

const appName = "Weather App";

router.get("/", async (req, res) => {
    const locationList = await getLocationList();

    res.render("index.hbs", {
        application: { pageTitle: "Weather App", name: appName },
        locations: locationList,
        weather: {},
    });
});

router.get("/weather", async (req, res) => {
    const locationList = await getLocationList();

    const query = req.query.city || "Kyiv";

    const weather = await getWeatherByCity(query);

    const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    res.render("weather.hbs", {
        application: { pageTitle: `${weather.name} — ${appName}`, name: appName, icon: weatherIcon },
        locations: locationList,
        weather: { ...weather, icon: weatherIcon },
    });
});

module.exports = router;
