import { fetchWeatherByCoords } from './api.js';
import { createWeatherWidget } from './widget.js';
import { scrollToLatestWidget, setupScrollButtons } from './contoller.js';

document.getElementById('show-weather').addEventListener('click', async () => {
    const lat = parseFloat(document.getElementById('latitude').value);
    const lon = parseFloat(document.getElementById('longitude').value);

    if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        alert('Please enter valid latitude and longitude values.');
        return;
    }

    const weatherData = await fetchWeatherByCoords(lat, lon);
    if (weatherData) {
        createWeatherWidget(weatherData, lat, lon);
    }
});

document.getElementById('my-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherData = await fetchWeatherByCoords(latitude, longitude);
        if (weatherData) {
            createWeatherWidget(weatherData, latitude, longitude);
        }
    }, () => {
        alert('Unable to retrieve your location.');
    });
});