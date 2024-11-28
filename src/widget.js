import { generateMap } from './map.js';

export function createWeatherWidget(weatherData, lat, lon) {
    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.classList.add('weather-widget');

    widget.innerHTML = `
    <h3>${weatherData.name || 'Unknown Location'}</h3>
    <p>Temperature: ${weatherData.main.temp}°C</p>
    <p>Weather: ${weatherData.weather[0].description}</p>
    <p>Humidity: ${weatherData.main.humidity}%</p>
    <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
    <img src=${iconUrl}>
    `;

    const map = generateMap(lat, lon);
    widget.appendChild(map);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Widget';
    deleteButton.addEventListener('click', () => widget.remove());
    widget.appendChild(deleteButton);

    widgetContainer.appendChild(widget);
}
