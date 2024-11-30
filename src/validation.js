export function validateCoords(lat, lon){
    return !(isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180)
}

export function validateCity(cityName){
    return !!cityName
}