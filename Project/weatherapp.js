/* JavaScript file for handling weather data */

// Import the getWeatherData function from the weather.js module
import { getWeatherData } from "./weather.js";

/*
Function: getWeather
Purpose: Takes a city name as input and retrieves weather data for that city.
How it works: Calls the getWeatherData function from weather.js, passing the city name and a callback function (returnWeather) to handle the retrieved data.
Why: To initiate the weather data retrieval process.
*/
function getWeather(city) {
    getWeatherData(city, returnWeather);
}

/*
Function: lookupweather
Purpose: Handles the form submission event and initiates the weather lookup process.
How it works:
    1. Prevents the default form submission behavior.
    2. Gets the city name from the input field.
    3. Checks if the city name is empty.
    4. If the city name is not empty, calls the getWeather function to initiate the weather data retrieval.
Why: To handle user input and trigger the weather lookup process.
*/
function lookupweather(event) {
    event.preventDefault();
    var city = document.getElementById('cityInput').value;
    if (city == "") {
        alert("Please enter a city");
    } else {
        getWeather(city);
    }
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
Function: returnWeather
Purpose: Takes weather data as input and displays it on the page.
How it works:
    1. Gets references to the HTML elements where the weather data will be displayed.
    2. Sets the innerHTML and textContent properties of the elements to display the weather data.
    3. Calls the setBackground function to set the background image based on the weather condition.
Why: To display the retrieved weather data to the user.
*/
function returnWeather(data) {
    const cityName = document.getElementById('cityName');
    const condition = document.getElementById('condition');
    const timeZoneElement = document.getElementById('timeZone');
    const timeElement = document.getElementById('time');

    cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
    condition.textContent = `${data.current.condition.text} ${data.current.temp_f}°F`;

    const timeZoneName = getTimeZoneName(data.location.tz_id);
    timeZoneElement.textContent = `Time Zone: ${timeZoneName}`;

    const formattedTime = formatTimeWithTimezone(data.location.localtime_epoch, data.location.tz_id);
    timeElement.textContent = `Local Time: ${formattedTime}`;

    setBackground(data.current.condition.text, data.current.is_day);
    // Call the function to display the dynamic weather effects
    displayWeatherAnimation(data.current.condition.text.toLowerCase());
}

/*
Function: setBackground
Purpose: Takes a weather condition and a day/night indicator as input and sets the background image accordingly.
How it works:
    1. Determines whether it is day or night.
    2. Simplifies the weather condition to a more generic term.
    3. Constructs the file path to the background image.
    4. Sets the background image of the main element.
Why: To visually represent the current weather condition.
*/
function setBackground(condition, isDay) {
    var time = "day";
    if (isDay == false) {
        time = "night";
    }

    if (!isDay && condition.toLowerCase() == "sunny") {
        condition = "clear";
    }

    var image = `./images/${simpifyCondition(condition)}-${time}.jpg`;
    console.log(image);

    var style = `background: url(${image}) no-repeat center center fixed; 
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;`;

    document.getElementById('main').style = style;
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

/*
Function: displayWeatherAnimation
Purpose: Takes a weather condition as input and displays the appropriate animation.
How it works:
    1. Gets a reference to the weather animation container element.
    2. Clears any existing animations from the container.
    3. Based on the weather condition, creates the appropriate animation elements and appends them to the container.
Why: To visually represent the current weather condition.
*/
function displayWeatherAnimation(condition) {
    // Get the animation container
    const animationContainer = document.getElementById('weatherAnimationContainer');
    // Clear any existing animations
    animationContainer.innerHTML = '';

    // Check condition and add appropriate animation
    if (condition.includes('rain')) {
        // If the condition includes 'rain', create multiple rain drops
        for (let i = 0; i < 75; i++) {
            const rainDrop = document.createElement('div');
            rainDrop.classList.add('rain');
            rainDrop.style.left = Math.random() * 100 + '%';
            rainDrop.style.animationDelay = Math.random() * 3 + 's'; // Add more variation in the animation delay
            rainDrop.style.animationDuration = Math.random() * 5 + 5 + 's'; //add a range of lengths so the animation duration varies
            animationContainer.appendChild(rainDrop);
        }
    } else if (condition.includes('sunny') || condition.includes('clear')) {
        // If the condition includes 'sunny' or 'clear', create a sun
        const sun = document.createElement('div');
        sun.classList.add('sun');
        sun.style.animationDuration = Math.random() * 10 + 10 + 's'; //longer animation duration
        animationContainer.appendChild(sun);
    } else if (condition.includes('cloudy') || condition.includes('overcast')) {
      // If the condition includes 'cloudy or overcast', create multiple clouds
        for (let i = 0; i < 5; i++) { // create 5 clouds
            const cloud = document.createElement('div');
            cloud.classList.add('cloud');
            cloud.style.left = Math.random() * 100 + '%'; // random horizontal position
            cloud.style.top = Math.random() * 50 + '%'; // random vertical position
            cloud.style.animationDuration = Math.random() * 20 + 10 + 's'; //longer animation duration with some variation
            cloud.style.animationDelay = Math.random() * 5 + 's'; // add delay
            animationContainer.appendChild(cloud);
        }
    }  else if (condition.includes('snowy')) {
        // If the condition includes 'snowy', create multiple snowflakes
        for (let i = 0; i < 50; i++) {
            const snowFlake = document.createElement('div');
            snowFlake.classList.add('snow');
            snowFlake.style.left = Math.random() * 100 + '%'; //random horizontal position
            snowFlake.style.animationDelay = Math.random() * 5 + 's'; // Add some variation
            snowFlake.style.animationDuration = Math.random() * 7 + 5 + 's'; //random animation duration
            animationContainer.appendChild(snowFlake);
        }
    }
}

/*
Event Listener: "click" on the element with ID "lookupButton"
Purpose: To initiate the weather lookup process when the button is clicked.
How it works: Calls the lookupweather function when the button is clicked.
Why: To handle user input and trigger the weather lookup process.
*/
document.querySelector("#lookupButton").addEventListener("click", lookupweather);