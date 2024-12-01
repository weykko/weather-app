import { createApiUrl, apiUrlByCoords, fetchWeatherData } from './api.js';
import { createWeatherWidget, createStartWidget } from './widget.js';

const modeButton = document.querySelectorAll(".mode-button");
const coordsSearch = document.querySelector(".coords-search");
const citySearch = document.querySelector(".city-search");
const latInput = document.getElementById('latitude');
const lonInput = document.getElementById('longitude');
const cityInput = document.getElementById('city-name');
const showWeather = document.getElementById('show-weather');
const showLocWeather = document.getElementById('show-loc-weather');

createStartWidget()

modeButton.forEach((button) => {
    button.addEventListener("click", () => {
        modeButton.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        if (button.dataset.mode === "city") {
            citySearch.classList.add("active");
            coordsSearch.classList.remove("active");
        } if (button.dataset.mode === "coords") {
            citySearch.classList.remove("active");
            coordsSearch.classList.add("active");
        }
    });
});

showWeather.addEventListener('click', async () => {
    const activeMode = document.querySelector(".mode-button.active").dataset.mode;
    let apiUrl = createApiUrl(activeMode)
    if(!apiUrl) return;

    const weatherData = await fetchWeatherData(apiUrl);
    if (weatherData) {
        createWeatherWidget(weatherData);
    }
});

showLocWeather.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const apiUrl = apiUrlByCoords(latitude, longitude)
        const weatherData = await fetchWeatherData(apiUrl);
        if (weatherData) {
            createWeatherWidget(weatherData);
        }
    }, () => {
        alert('Unable to retrieve your location.');
    });
});

cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        showWeather.click()
    }
});

latInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        lonInput.focus();
    }
});

lonInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        showWeather.click()
    }
});