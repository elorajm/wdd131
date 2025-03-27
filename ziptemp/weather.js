/* JavaScript file for retrieving weather data from an external API */

/*
Function: getWeatherData
Purpose: Takes a city name as input and retrieves weather data from the WeatherAPI.
How it works:
    1. Constructs the API URL using the city name and API key.
    2. Makes a fetch request to the API.
    3. Handles the response from the API.
    4. If the response is not OK, throws an error.
    5. Parses the response as JSON.
    6. Calls the returnCallback function with the retrieved data.
    7. Handles any errors that occur during the process.
Why: To retrieve weather data from an external API.
*/
export function getWeatherData(city, returnCallback) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=a52499ff54b643158ec24459241607&q=${city}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {

            returnCallback(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });


}