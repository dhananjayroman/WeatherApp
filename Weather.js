// 🌤️ Function to fetch weather data for Bhor, India
function fetchWeatherData() {
    const apiKey = 'ae27d5d7165852e667e3dac2828b459c'; // OpenWeather API Key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Bhor&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract temperature and weather information from the response
            const temp = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
            const tempMin = Math.round(data.main.temp_min - 273.15);
            const tempMax = Math.round(data.main.temp_max - 273.15);
            const weatherDescription = data.weather[0].main.toLowerCase();

            // Update the temperature and min/max info
            document.getElementById('temperature').textContent = `${temp}°C`;
            document.getElementById('temp_minmax').textContent = `Min ${tempMin}°C | Max ${tempMax}°C`;

            // Update weather icon based on weather condition
            const weatherConditionDiv = document.getElementById('weathercondition');
            const weatherIcon = weatherConditionDiv.querySelector('i');

            weatherConditionDiv.classList.remove('sunny', 'cloudy', 'rainy');
            if (weatherDescription.includes('clear')) {
                weatherConditionDiv.classList.add('sunny');
                weatherIcon.className = 'fas fa-sun';
                weatherIcon.style.color = 'darkkhaki';
            } else if (weatherDescription.includes('clouds')) {
                weatherConditionDiv.classList.add('cloudy');
                weatherIcon.className = 'fas fa-cloud';
                weatherIcon.style.color = 'lightgray';
            } else if (weatherDescription.includes('rain')) {
                weatherConditionDiv.classList.add('rainy');
                weatherIcon.className = 'fas fa-cloud-showers-heavy';
                weatherIcon.style.color = 'lightblue';
            } else {
                weatherIcon.className = 'fas fa-sun';
                weatherIcon.style.color = 'darkkhaki';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Unable to retrieve weather data. Please check your connection.');
        });
}


// 🕒 Function to display the current date and time
function updateTime() {
    const date = new Date();
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const day = days[date.getDay()];
    const month = date.toLocaleString('default', { month: 'short' });
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Pad minutes to 2 digits
    const period = hours >= 12 ? 'PM' : 'AM';
    
    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12; // If hours = 0, set it to 12
    hours = hours.toString().padStart(2, '0'); // Pad hours to 2 digits

    document.getElementById('date').textContent = `${day} | ${month} | ${hours}:${minutes}${period}`;
}

// 🕒 Update time every 60 seconds
updateTime();
setInterval(updateTime, 60000);








