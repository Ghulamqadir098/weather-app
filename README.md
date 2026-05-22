# Weather Application

A simple and intuitive weather application that provides real-time weather information for any city around the world.

## Setup Instructions

1. **Clone or download the project**
   - Download the project files to your local machine or clone the repository

2. **Open the project**
   - Navigate to the project folder
   - Open `index.html` in your web browser (double-click the file or drag it to your browser)

3. **No installation required**
   - This is a vanilla JavaScript project with no dependencies
   - Simply open the HTML file in any modern web browser

## API Used

- **OpenWeatherMap API**
  - Endpoint: `http://api.openweathermap.org/data/2.5/weather`
  - Used for fetching real-time weather data
  - Provides temperature, humidity, wind speed, weather condition, and location information
  - Weather icons provided by OpenWeatherMap

## Features Completed

✅ **Current Weather Display**
   - Search weather by city name
   - Display current temperature in Celsius
   - Show weather condition with corresponding icon
   - Display city name and country

✅ **Weather Information**
   - Temperature (in Celsius)
   - Humidity percentage
   - Wind speed (in km/h)
   - Weather condition description

✅ **Search Functionality**
   - Search by typing city name and clicking the Search button
   - Support for Enter key to trigger search
   - Error handling for invalid city names

✅ **Search History**
   - Displays last 5 searched cities in a table format
   - Persists data using browser's localStorage
   - Shows temperature, condition, humidity, and wind speed for each search

✅ **5-Day Weather Forecast**
   - Display forecast data for the next 5 days

✅ **Responsive Design**
   - Clean and user-friendly interface
   - History toggle button for easy navigation
