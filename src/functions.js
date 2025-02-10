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
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Fetches the city name based on the provided IP address.
 *
 * @param {string} ip - The IP address to fetch the city name for.
 * @returns {Promise<string>} The city name.
 * @throws Will try fallback url address or throw an error.
 */
const getCityByIp = async (ip) => {
    const primaryUrl = `https://freeipapi.com/api/json/${ip}`;
    const fallbackUrl = `https://ipapi.co/${ip}/json/`;

    try {
        const response = await axios.get(primaryUrl);
        return response.data.cityName;
    } catch (error) {
        console.error(`Primary URL failed: ${error.message}. Trying fallback URL...`);
        try {
            const fallbackResponse = await axios.get(fallbackUrl);
            return fallbackResponse.data.city;
        } catch (fallbackError) {
            console.error(`Fallback URL also failed: ${fallbackError.message}`);
            throw fallbackError;
        }
    }
};

/**
 * Fetches weather data based on the provided latitude and longitude coordinates.
 *
 * @param {number} latitude - The latitude of the location.
 * @param {number} longitude - The longitude of the location.
 * @returns {Promise<Object|null>} A promise that resolves to the weather data object if successful, or null if an error occurs.
 */
const getWeatherByCoordinates = async (latitude, longitude) => {
    const API_KEY = process.env.API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Checks if the given IP address is a local IP address.
 * @param {string} ip - The IP address to check.
 * @returns {boolean} - Returns true if the IP address is local, otherwise false.
 */
const isIpLocal = (ip) => {
    if (!ip) return false;

    const localIps = [
        "::1",
        "127.0.0.1",
        "192.168.",
        "10.",
        "172.16.",
        "172.17.",
        "172.18.",
        "172.19.",
        "172.20.",
        "172.21.",
        "172.22.",
        "172.23.",
        "172.24.",
        "172.25.",
        "172.26.",
        "172.27.",
        "172.28.",
        "172.30.",
        "172.31.",
    ];

    const localIpSet = new Set(localIps);
    return [...localIpSet].some((localIp) => ip.startsWith(localIp));
};

/**
 * Generates the URL for the weather icon based on the provided icon code.
 *
 * @param {string} icon - The icon code from the weather data.
 * @returns {string} The URL for the weather icon.
 */
function getWeatherIconUrl(icon) {
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}

module.exports = {
    getLocationList,
    getWeatherByCity,
    getCityByIp,
    getWeatherByCoordinates,
    isIpLocal,
    getWeatherIconUrl,
};
