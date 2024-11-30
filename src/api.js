import { API_KEY } from "./apikey.js";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export function createCoordsApiUrl(lat, lon) {
    return `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
}

export function createCityApiUrl(cityName) {
    return `${BASE_URL}?units=metric&appid=${API_KEY}&q=${cityName}`
}

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
