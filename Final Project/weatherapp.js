
import { getWeatherData } from "./weather.js";
function getWeather(zipCode) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=a52499ff54b643158ec24459241607&q=${zipCode}`;
   // const outputElement = document.getElementById('output');
    const cityName = document.getElementById('cityName');
    const condition = document.getElementById('condition');

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
        console.log(data);
        cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
        condition.textContent = `${data.current.condition.text} ${data.current.temp_f}°F`;
        
       setBackground(data.current.condition.text, data.current.is_day);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function lookupweather(event) {
    
    event.preventDefault();
    var city = document.getElementById('cityInput').value;
    if (city == "") {
        alert("Please enter a city");
    } else {
        getWeatherData(city, returnWeather);
    }
}

function returnWeather(data) {
    const cityName = document.getElementById('cityName');
    const condition = document.getElementById('condition');
    cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
    condition.textContent = `${data.current.condition.text} ${data.current.temp_f}°F`;
    
    setBackground(data.current.condition.text, data.current.is_day);
}

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
    } else if (test.includes('mist')  || test.includes('rain') || test.includes('drizzle') || test.includes('thundery outbreaks possible')) {
        return "rainy";
    }  else if (test.includes('fog')) {
        return "foggy";
    }
    return "unknown";
} 

document.querySelector('#lookupButton').addEventListener('click', lookupweather);
