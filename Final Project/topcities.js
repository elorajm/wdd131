function getWeatherForCity(city, cityId) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=a52499ff54b643158ec24459241607&q=${city}`;
   // const outputElement = document.getElementById('output');
    //const cityName = document.getElementById('cityName');
    const cityCondition = document.getElementById(`${cityId}-weather`);

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
        
        //cityName.innerHTML = `${data.location.name}, ${data.location.region}`;
        cityCondition.textContent = `${data.current.condition.text} ${data.current.temp_f}°F`;
        
        setBackground(data.current.condition.text, data.current.is_day, cityId);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function loadWeather() {
    let myArray = [
        ['London', 'london'], 
        ['Dubai', 'dubai'],
        ['New York', 'ny'],
        ['Tokyo', 'tokyo']
        ];

    for (let i = 0; i < myArray.length; i++) {
        getWeatherForCity(myArray[i][0], myArray[i][1]);
    }
    //getWeatherForCity('London', 'london');
    //getWeatherForCity('Dubai', 'dubai');
    //getWeatherForCity('New York', 'ny');
    //getWeatherForCity('Tokyo', 'tokyo');
}

loadWeather();

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