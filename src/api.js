import { API_KEY } from "./apikey.js";
import { validateCoords, validateCity } from "./validation.js";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function fetchWeatherData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again.');
    }
}

export function createApiUrl(activeMode){
    let apiUrl = ''

    if (activeMode === "coords") {
        const lat = parseFloat(document.getElementById('latitude').value);
        const lon = parseFloat(document.getElementById('longitude').value);

        if (!validateCoords(lat, lon)) {
            alert('Please enter valid latitude and longitude values');
            return;
        }

        apiUrl = apiUrlByCoords(lat, lon)
    }
    else {
        const cityName = document.getElementById('city-name').value.trim()

        if (!validateCity(cityName)){
            alert('Please enter the city name');
            return;
        }

        apiUrl = apiUrlByCity(cityName)
    }

    return apiUrl
}

export function apiUrlByCoords(lat, lon) {
    return `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
}

export function apiUrlByCity(cityName) {
    return `${BASE_URL}?units=metric&appid=${API_KEY}&q=${cityName}`
}