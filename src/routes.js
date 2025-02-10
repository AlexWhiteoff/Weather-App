const express = require("express");
const router = express.Router();
const {
    getLocationList,
    getWeatherByCity,
    getCityByIp,
    getWeatherByCoordinates,
    isIpLocal,
    getWeatherIconUrl,
} = require("./functions");
const requestIp = require("request-ip");

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
    let city = req.query.city;
    const renderOptions = {
        locations: [],
        application: { pageTitle: "", name: appName },
        weather: {},
        needLocation: false,
    };

    try {
        const locationList = await getLocationList();
        renderOptions.locations = locationList;

        if (!city) {
            const ip = requestIp.getClientIp(req);

            if (!ip || isIpLocal(ip)) {
                renderOptions.needLocation = true;
                renderOptions.weather = null;

                renderOptions.application.pageTitle = `Loading — ${appName}`;

                return res.render("weather", renderOptions);
            }

            city = await getCityByIp(ip);
        }

        const weather = await getWeatherByCity(city);

        const weatherIcon = getWeatherIconUrl(weather.weather[0].icon);

        renderOptions.application = { pageTitle: `${weather.name} — ${appName}`, name: appName, icon: weatherIcon };
        renderOptions.weather = { ...weather, icon: weatherIcon };

        res.render("weather", renderOptions);
    } catch (error) {
        console.error(`Error ${error.status}: ${error}.`);
        switch (String(error.status)[0]) {
            case "4":
                res.render("weather", {
                    application: {
                        pageTitle: `404 Not Found — ${appName}`,
                        name: appName,
                        icon: "/lost.ico",
                    },
                    response: {
                        status: false,
                        code: 404,
                        message:
                            "We went around the whole planet, but we can't find this place. Seems it just doesn't exists :(",
                    },
                });
                break;
            default:
                res.render("weather", {
                    application: {
                        pageTitle: `500 Server Error — ${appName}`,
                        name: appName,
                        icon: "/dead.ico",
                    },
                    response: {
                        status: false,
                        code: 500,
                        message: "Oops, looks like we have a problem. Please, reload the page or try again later.",
                    },
                });
        }
    }
});

router.post("/weather", async (req, res) => {
    const { type, latitude, longitude, ip } = req.body;

    try {
        let weather;

        if (type === "coordinates") {
            weather = await getWeatherByCoordinates(latitude, longitude);
        } else if (type === "ip") {
            const city = await getCityByIp(ip);
            weather = await getWeatherByCity(city);
        }

        if (weather) {
            const weatherIcon = getWeatherIconUrl(weather.weather[0].icon);

            const application = {
                pageTitle: `${weather.name} — ${appName}`,
                icon: weatherIcon,
            };

            weather.icon = weatherIcon;

            const html = await new Promise((resolve, reject) => {
                res.render(
                    "partials/weatherData",
                    { application, weather, layout: false, status: true },
                    (err, renderedHtml) => {
                        if (err) reject(err);
                        resolve(renderedHtml);
                    }
                );
            });

            return res.status(200).send({
                html: html,
                application: application,
            });
        }

        const html = await new Promise((resolve, reject) => {
            res.render(
                "partials/errorMessage",
                {
                    layout: false,
                    response: {
                        status: false,
                        code: 500,
                        message: "Oops, looks like we have a problem. Please, reload the page or try again later.",
                    },
                },
                (err, renderedHtml) => {
                    if (err) reject(err);
                    resolve(renderedHtml);
                }
            );
        });

        res.status(500).send({
            html: html,
            application: {
                pageTitle: `500 Server Error — ${appName}`,
                icon: "/dead.ico",
            },
        });
    } catch (error) {
        console.error(`Error ${error.status}: ${error}.`);
        switch (String(error.status)[0]) {
            case "4":
                res.status(400).send({
                    html: await new Promise((resolve, reject) => {
                        res.render(
                            "partials/errorMessage",
                            {
                                layout: false,
                                response: {
                                    status: false,
                                    code: 400,
                                    message:
                                        "We went around the whole planet, but we can't find this place. Seems it just doesn't exists :(",
                                },
                            },
                            (err, renderedHtml) => {
                                if (err) reject(err);
                                resolve(renderedHtml);
                            }
                        );
                    }),
                    application: {
                        pageTitle: `400 Error — ${appName}`,
                        icon: "/lost.ico",
                    },
                });
                break;
            default:
                res.status(500).send({
                    html: await new Promise((resolve, reject) => {
                        res.render(
                            "partials/errorMessage",
                            {
                                layout: false,
                                response: {
                                    status: false,
                                    code: 500,
                                    message:
                                        "Oops, looks like we have a problem. Please, reload the page or try again later.",
                                },
                            },
                            (err, renderedHtml) => {
                                if (err) reject(err);
                                resolve(renderedHtml);
                            }
                        );
                    }),
                    application: {
                        pageTitle: `500 Server Error — ${appName}`,
                        icon: "/dead.ico",
                    },
                });
        }
    }
});

module.exports = router;
