const apiKey = 'de257f4758e6559c993cd8d94bff956f';
let descriptionIcon;

async function fetchWeatherData(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = await response.json();
    console.log(data);

    updateWeatherUI(data);
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");

document.addEventListener('DOMContentLoaded', function () {
    descriptionIcon = document.querySelector(".description i");
});

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeed.textContent = `${data.wind.speed} km/h `;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000} km/hr`;
    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    
    const weatherCondition = data.weather[0].main;
    descriptionIcon.innerHTML = `<i class="material-icons">${getWeatherIconName(weatherCondition)}</i>`;
    
    changeBackgroundImage(weatherCondition);
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function (e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    }
});

function changeBackgroundImage(weatherCondition) {
    const bodyElement = document.body;
    const backgroundImages = {
        Clear: "clear-sky.jpg",
        Clouds: "cloudy.jpg",
        Rain: "rainy.jpg",
        Thunderstorm: "thunderstorm.jpg",
        Drizzle: "rainy.jpg",
        Snow: "snow.jpg",
        Mist: "foggy.jpg",
        Smoke: "foggy.jpg",
        Haze: "foggy.jpg",
        Fog: "foggy.jpg",
    };

    const defaultImage = "wea.jpg";
    bodyElement.style.backgroundImage = `url(${backgroundImages[weatherCondition] || defaultImage})`;
}

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };

    return iconMap[weatherCondition] || "help";
}
