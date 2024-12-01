import { generateMap } from './map.js';
import { scrollToLatestWidget } from './scroll.js';

export function createStartWidget() {
    const widgetContainer = document.getElementById('widget-container');

    const widget = document.createElement('div');
    widget.classList.add('weather-widget', 'start-widget', 'fade-in');
    widget.id = 'start-widget'
    widget.innerHTML = `
    <p>Enter the city name or coordinates to see the weather in this location.</p>
    <p>You can also see the weather in your location.</p>
    <img src="src/assets/nerd-face.png">
    `;

    widgetContainer.appendChild(widget);
    widget.addEventListener('animationend', () => { widget.classList.remove('fade-in'); });
}

export function createWeatherWidget(weatherData) {
    const startWidget = document.getElementById('start-widget');
    if (startWidget) startWidget.remove();

    const widgetContainer = document.getElementById('widget-container');
    const widget = document.createElement('div');
    widget.classList.add('weather-widget', 'fade-in');
    widget.innerHTML = createWidgetHTML(weatherData);

    generateMap(widget, weatherData.coord.lat, weatherData.coord.lon)

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';    
    deleteButton.addEventListener('click', () => {
        if (document.querySelectorAll(".weather-widget").length <= 3) widgetContainer.classList.remove("overflow");
        widget.classList.add('fade-out');
        widget.addEventListener('animationend', () => { widget.remove(); });
        if (document.querySelectorAll(".weather-widget").length === 1) {
            setTimeout(() => { createStartWidget(); }, 500);
        }
    });
    widget.appendChild(deleteButton);

    widgetContainer.appendChild(widget);
    widget.addEventListener('animationend', () => { widget.classList.remove('fade-in'); });
    if (document.querySelectorAll(".weather-widget").length > 3) widgetContainer.classList.add("overflow");

    scrollToLatestWidget();
}

function createWidgetHTML(weatherData) {
    const iconPath = `./src/assets/weather/${weatherData.weather[0].icon}.png`;

    return `
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
            <img class="weather-icon" src=${iconPath}>
            <p>${weatherData.weather[0].main}</p>
        </div> 
    </div>
    `;
}
