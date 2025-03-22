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