function displayTemperature(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#windSpeed");
    let iconElement = document.querySelector("#icon");
    let descriptionElement = document.querySelector("#description");

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon alt=${response.data.condition.icon}"/>`
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = response.data.wind.speed;
    descriptionElement.innerHTML = response.data.condition.description

    getForecast(response.data.city);
}

function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
}

function formatDay(time) {
    let date = new Date(time * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
return days[date.getDay()]
}

function getForecast(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
        if (index < 5) {
            forecastHtml =
                forecastHtml +
                `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon" alt=${day.condition.icon} />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
      </div>
      </div>
    `;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}


function handleSearchCity(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchCity);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Paris")
