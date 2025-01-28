document.getElementById("search-btn").addEventListener("click", function () {
  const city = document.getElementById("city-input").value;
  if (city) {
    fetchWeather(city);
  }
});

document
  .getElementById("city-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const city = document.getElementById("city-input").value;
      if (city) {
        fetchWeather(city);
      }
    }
  });

function fetchWeather(city) {
  const apiKey = "76a577ed9796aeb58e55a699ab8e421e"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === 200) {
        displayWeather(data);
        changeBackground(data.main.temp); // Change background based on temperature
      } else {
        alert("City not found. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function displayWeather(data) {
  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;

  document.getElementById("city-name").textContent = cityName;
  document.getElementById(
    "temperature"
  ).textContent = `Temperature: ${temperature}°C`;
  document.getElementById(
    "weather-description"
  ).textContent = `Weather: ${weatherDescription}`;
}

function changeBackground(temperature) {
  const body = document.body;
  if (temperature < 25) {
    body.style.backgroundImage = "url('cold.jpg')"; // Cold background
  } else if (temperature >= 25 && temperature <= 35) {
    body.style.backgroundImage = "url('pleasant.jpg')"; // Pleasant background
  } else {
    body.style.backgroundImage = "url('hot.jpg')"; // Hot background
  }
  body.style.backgroundSize = "cover"; // Ensure the background covers the entire screen
  body.style.backgroundPosition = "center"; // Center the background image
}
