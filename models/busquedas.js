const axios = require('axios')

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor() {

    }

    get language() {
        return 'es';
    }

    get paramsMapBox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': this.language
        }
    }

    get paramsOpenWeather() {
        return {
            'appid': process.env.OPEN_WEATHER_KEY,
            'units': 'metric',
            'lang': this.language
        }
    }

    async ciudades(lugar) {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox,
                language: 'es',
            })

            const resp = await instance.get();

            return resp.data.features.map(e => ({
                id: e.id,
                nombre: e.place_name,
                short_code: e.properties.short_code,
                lng: e.center[0],
                lat: e.center[1],
            }))

        } catch (error) {
            console.log("error");
            console.log(error);

            return [];
        }

    }

    async climaLugar(lat, lon) {

        try {

            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { ...this.paramsOpenWeather, lat, lon }
            })

            const resp = await instance.get();

            //console.log(resp.data);

            return resp.data


        } catch (error) {
            console.log('error');
            console.log(error);
            return []
        }
    }

}


module.exports = Busquedas