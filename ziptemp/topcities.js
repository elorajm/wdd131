/* JavaScript file for handling weather data for top cities */

/*
Function: getWeatherForCity
Purpose: Takes a city name and city ID as input and retrieves weather data for that city.
How it works:
    1. Constructs the API URL using the city name and API key.
    2. Makes a fetch request to the API.
    3. Handles the response from the API.
    4. If the response is not OK, throws an error.
    5. Parses the response as JSON.
    6. Sets the textContent properties of the appropriate HTML elements to display the weather data, time zone, and local time.
    7. Calls the setBackground function to set the background image based on the weather condition.
Why: To retrieve and display weather data for a specific city.
*/
function getWeatherForCity(city, cityId) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=a52499ff54b643158ec24459241607&q=${city}`;
    const cityCondition = document.getElementById(`${cityId}-weather`);
    const cityTimeZone = document.getElementById(`${cityId}-timeZone`);
    const cityTime = document.getElementById(`${cityId}-time`);

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
            cityCondition.textContent = `${data.current.condition.text} ${data.current.temp_f}°F`;
            const timeZoneName = getTimeZoneName(data.location.tz_id);
            cityTimeZone.textContent = `Time Zone: ${timeZoneName}`;
            const formattedTime = formatTimeWithTimezone(data.location.localtime_epoch, data.location.tz_id);
            cityTime.textContent = `Local Time: ${formattedTime}`;
            setBackground(data.current.condition.text, data.current.is_day, cityId);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

/*
Function: getTimeZoneName
Purpose: Takes a timezone ID as input and returns a user-friendly timezone name.
How it works: Uses a series of if statements to match the timezone ID to a user-friendly name.
Why: To display a more readable timezone name to the user.
*/
function getTimeZoneName(timeZoneId) {
    if (timeZoneId.includes("America/Los_Angeles")) {
        return "Pacific Time";
    } else if (timeZoneId.includes("America/Denver")) {
        return "Mountain Time";
    } else if (timeZoneId.includes("America/Chicago")) {
        return "Central Time";
    } else if (timeZoneId.includes("America/New_York")) {
        return "Eastern Time";
    } else {
        return `Time Zone: ${timeZoneId}`; // Or handle other timezones as needed
    }
}

/*
Function: formatTimeWithTimezone
Purpose: Takes an epoch timestamp and timezone as input and returns a formatted time string.
How it works:
    1. Creates a Date object from the epoch timestamp.
    2. Uses the toLocaleString method to format the time string according to the specified timezone and options.
Why: To display the local time of the location for which weather data is being displayed.
*/
function formatTimeWithTimezone(epoch, timezone) {
    const date = new Date(epoch * 1000); // Epoch is in seconds, JS uses milliseconds
    const options = {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
}

/*
Function: loadWeather
Purpose: Loads weather data for a list of predefined cities.
How it works:
    1. Creates an array of city names and city IDs.
    2. Iterates over the array and calls the getWeatherForCity function for each city.
Why: To display weather data for a list of top cities when the page loads.
*/
function loadWeather() {
    let myArray = [
        ['London', 'london'],
        ['Dubai', 'dubai'],
        ['New York', 'ny'],
        ['Tokyo', 'tokyo'],
        ['Sydney', 'sydney'],
        ['Paris', 'paris'],
        ['Rio de Janeiro', 'rio'],
        ['Rome', 'rome']
    ];

    for (let i = 0; i < myArray.length; i++) {
        getWeatherForCity(myArray[i][0], myArray[i][1]);
    }
}

/*
Function: setBackground
Purpose: Takes a weather condition, a day/night indicator, and a city code as input and sets the background image accordingly.
How it works:
    1. Determines whether it is day or night.
    2. Simplifies the weather condition to a more generic term.
    3. Constructs the file path to the background image.
    4. Sets the background image of the city container.
Why: To visually represent the current weather condition for each city.
*/
function setBackground(condition, isDay, cityCode) {
    var time = "day";
    if (isDay == false) {
        time = "night";
    }

    if (!isDay && condition.toLowerCase() == "sunny") {
        condition = "clear";
    }

    var image = `./Cities/${cityCode}-${simpifyCondition(condition)}-${time}.jpg`;
    console.log(image);

    var style = `background: url(${image}) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;`;

    document.getElementById(`${cityCode}`).style = style;
}

/*
Function: simpifyCondition
Purpose: Takes a weather condition as input and simplifies it to a more generic term.
How it works: Uses a series of if statements to match the weather condition to a generic term.
Why: To reduce the number of background images needed.
*/
function simpifyCondition(condition) {
    var test = condition.toLowerCase();
    if (test.includes('sunny')) {
        return "sunny";
    } else if (test.includes('clear')) {
        return "clear";
    } else if (test.includes('cloud') || test.includes('overcast')) {
        return "cloudy";
    } else if (test.includes('snow') || test.includes('freezing') || test.includes('sleet') || test.includes('ice') || test.includes('blizzard')) {
        return "snowy";
    } else if (test.includes('mist') || test.includes('rain') || test.includes('drizzle') || test.includes('thundery outbreaks possible')) {
        return "rainy";
    } else if (test.includes('fog')) {
        return "foggy";
    }
    return "unknown";
}