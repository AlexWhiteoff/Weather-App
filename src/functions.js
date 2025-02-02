const axios = require("axios");


/**
 * Fetches a list of locations from a specified URL.
 * The URL can be set via the LOCATION_URL environment variable,
 * otherwise it defaults to "http://localhost:3000/assets/locations.json".
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of location objects.
 * @throws {Error} Throws an error if the request fails.
 */
const getLocationList = async () => {
    const url = process.env.LOCATION_URL || "http://localhost:3000/assets/locations.json";

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fetches weather data for a given city using the OpenWeatherMap API.
 *
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<Object>} A promise that resolves to the weather data object for the specified city.
 * @throws Will log an error to the console if the API request fails.
 */
const getWeatherByCity = async (city) => {
    const API_KEY = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    return axios
        .get(url)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

module.exports = { getLocationList, getWeatherByCity };
