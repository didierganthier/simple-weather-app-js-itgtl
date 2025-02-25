const apiKey = "MY_API_KEY";

const getWeather = () => {
    const city = document.getElementById("cityInput").value;
    const weatherInfo = document.getElementById("weatherInfo");

    if(!city) {
        weatherInfo.innerHTML = "⚠️ Please enter a city name.";
        clearWeatherInfo(weatherInfo);
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    weatherInfo.innerHTML = "⏳ Fetching weather data";

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if(data.cod === "404") {
            weatherInfo.innerHTML = "❌ City not found. Try again.";
            clearWeatherInfo(weatherInfo);
        } else {
            weatherInfo.innerHTML =  `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡️ Temperature: ${data.main.temp}°C</p>
                <p>⛅ Condition: ${data.weather[0].description}</p>
                <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png">
            `
        }
    }).catch(() => {
        console.log("error happened here")
        weatherInfo.innerHTML = "❌ Error fetching data. Try again later.";
        clearWeatherInfo(weatherInfo);
    })
}

const clearWeatherInfo = (weatherInfo) => {
    setTimeout(() => {
        weatherInfo.innerHTML = "";
    }, 3000)
}

document.getElementById("getWeatherBtn").addEventListener('click', getWeather);