import { API_KEY } from "./apikey.js";

const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
//const city_url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=ru&appid=f623081260f363d8e8a15fe44e841483&q='

export async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Error fetching weather data. Please try again.');
    }
}
