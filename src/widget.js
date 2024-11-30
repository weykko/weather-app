import { generateMap } from './map.js';

export function createWeatherWidget(weatherData) {
    const startWidget = document.getElementById('start-widget');
    if (startWidget) {
      startWidget.remove();
    }

    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    const iconUrl = `./src/assets/weather/${weatherData.weather[0].icon}.png`;
    widget.classList.add('weather-widget');

    widget.innerHTML = `
    <div class="weather-data">
        <div class="main-box">
            <h3 class="city-name">${weatherData.name || 'Unknown Location'}</h3>
            <div class="temperature-data">
                <p>Temperature: ${weatherData.main.temp}°C</p>
                <p>Feels like: ${weatherData.main.feels_like}°C</p>
            </div>
            <div class="over-data">
                <p>Humidity: ${weatherData.main.humidity}%</p>
                <p>Pressure: ${weatherData.main.pressure} hPa</p>
                <p>Wind Speed: ${weatherData.wind.speed} m/s</p>
            </div>    
        </div>  
        <div class="weather-box">
            <img class="weather-icon" src=${iconUrl}>
            <p>${weatherData.weather[0].main}</p>
        </div> 
    </div>     
    `;

    const lat = weatherData.coord.lat
    const lon = weatherData.coord.lon
    const map = generateMap(lat, lon);
    widget.appendChild(map);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => widget.remove());
    widget.appendChild(deleteButton);

    widgetContainer.appendChild(widget);
    setTimeout(() => {
        widget.classList.add('appear');
      }, 10);

    if (document.querySelectorAll(".weather-widget").length > 3){
        widgetContainer.classList.add("overflow");
    }
}
