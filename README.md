# Weather App

A Node.js-based weather application that fetches weather data using the OpenWeatherMap API and dynamically updates the UI based on user input and location.

## Features

- Get weather data based on:
    - Entered city name
    - IP address detection
    - Geolocation coordinates
- Dynamically updates information based on weather data
- Uses Handlebars (`hbs`) as the templating engine
- Express.js backend

## Installation

1. Clone the repository:
     ```sh
     git clone https://github.com/yourusername/weather-app.git
     ```
2. Navigate to the project folder:
     ```sh
     cd weather-app
     ```
3. Install dependencies:
     ```sh
     npm install
     ```
4. Create a `.env` file and add your OpenWeatherMap API key and the port number:
     ```ini
     # Replace 'your_port_here' with the port number you want to use
     PORT=your_port_here

     # Replace 'your_api_key_here' with your actual OpenWeatherMap API key
     API_KEY=your_api_key_here
     ```
5. Start the server:
     ```sh
     npm start
     ```

## API Endpoints

### `POST /weather`

Fetches weather data based on the provided request body.

#### Request Body

```json
{
    "type": "coordinates" | "ip",
    "latitude": "(if using coordinates)",
    "longitude": "(if using coordinates)",
    "ip": "(if using ip)"
}
```

#### Response (Success)

Returns a rendered partial `weatherData` with weather information.

#### Response (Error)

Returns a rendered partial `errorMessage` with an error message.

## Project Structure

```
weather-app
│   .env                        # Environment variables
│   package.json                # Dependencies and scripts
│   README.md                   # Project documentation
│
├───public                      # Static files (JS, icons, etc)
│   ├───assets                  # Assets like images, fonts, etc.
│   └───scripts                 # Client-side JavaScript files
│
├───src
│   ├───app.js                  # Entry point of the application
│   ├───routes.js               # Express routes
│   └───functions.js            # Helper functions
│
├───views                       # Handlebars templates
│   ├───partials                # Reusable components
│   │   ├───errorMessage.hbs    # Error message partial
│   │   ├───footer.hbs          # Footer partial
│   │   ├───header.hbs          # Header partial
│   │   ├───loading.hbs         # Loading spinner partial
│   │   └───weatherData.hbs     # Weather data partial
│   │   
│   ├───layout.hbs              # Main layout template
│   ├───weather.hbs             # Main weather page template
│   └───index.hbs               # Index page template
```

## Scripts

- `npm start` - Runs the application.
- `npm run dev` - Runs the app with nodemon for development.

## Dependencies

- `express`
- `hbs`
- `axios`
- `dotenv`
- `request-ip`

## License

This project is licensed under the MIT License.

Copyright (c) Білий Олександр