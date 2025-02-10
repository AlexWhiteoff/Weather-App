const getUserIp = async () => {
    try {
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error:", error);
        return null;
    }
};

const getLocation = async () => {
    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    type: "coordinates",
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            async () => {
                const ip = await getUserIp();
                resolve({ type: "ip", ip });
            }
        );
    });
};

(async () => {
    const isNeedLocation =
        document.getElementById("need-location") &&
        document.getElementById("need-location").getAttribute("data-need-location");

    if (isNeedLocation === "true") {
        const location = await getLocation();

        await fetch("/weather", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(location),
        })
            .then((res) => res.json())
            .then((data) => {
                document.querySelector("#weather-container").innerHTML = data.html;

                const application = data.application;

                document.title = application ? `${application.pageTitle}` : "404 Error";
                document.querySelector("link[rel='icon']").href = application && application.icon;
            })
            .catch((err) => console.error("Error fetching weather:", err));
    }
})();
