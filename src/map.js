export function generateMap(widget, lat, lon){
    const mapContainer = document.createElement("div");
    mapContainer.classList.add('map-container');
    mapContainer.style.height = "408px";
    widget.appendChild(mapContainer);
    
    const map = L.map(mapContainer, { attributionControl: false });
    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    }).addTo(map);
    
    const marker = L.marker([lat, lon]).addTo(map);
    
    map.setView(marker.getLatLng(), 11);

    setTimeout(() => {
        map.invalidateSize();
    }, 0);
}