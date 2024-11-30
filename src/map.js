export function generateMap(lat, lon) {
    const mapContainer = document.createElement('div');
    mapContainer.classList.add('map-container');

    const mapIframe = document.createElement('iframe');
    //api openstreetmap работает только с vpn
    //mapIframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01}%2C${lat - 0.01}%2C${lon + 0.01}%2C${lat + 0.01}&layer=mapnik&marker=${lat}%2C${lon}`;
    mapIframe.src = `https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=408&height=408&center=lonlat:${lon},${lat}&zoom=10&marker=lonlat:${lon},${lat};color:%23007bff;size:medium&apiKey=cd3386bf280348a7931c870606015114`
    mapIframe.allowFullscreen = true;
    mapIframe.style.border = 0;

    mapContainer.appendChild(mapIframe);

    return mapContainer;
}