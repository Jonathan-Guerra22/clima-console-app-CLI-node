const fs = require('fs');
const axios = require('axios')

class Busquedas {

    historial = [];
    archivoPath = './files/file.json';

    constructor() {
        this.leerArchivo()
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

    get historialCapitalizado(){
        return this.historial.map( lugar =>{
            let palabras = lugar.split(' ');
            palabras = palabras.map( palabra => palabra[0].toUpperCase() + palabra.substring(1));
            return palabras.join(' ');
        });
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


    agregarHistorial(lugar){

        if (this.historial.includes(lugar.toLocaleLowerCase())){


            const aux = this.historial.filter( i => i.toLocaleLowerCase() !== lugar.toLocaleLowerCase())


            aux.unshift(lugar.toLocaleLowerCase());

            this.historial = aux;
            this.historial = this.historial.slice(0,5);
            this.guardarEnArchivo();
            return;
        }

        this.historial = this.historial.slice(0,4);

        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarEnArchivo()
    }

    guardarEnArchivo(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.archivoPath, JSON.stringify(payload))

    }


    leerArchivo(){

        if(!fs.existsSync(this.archivoPath)) return;

        const info = fs.readFileSync(this.archivoPath, {encoding:'utf-8'});
        const data = JSON.parse(info);

        this.historial = data.historial;
    }

    


    async eliminarDelhistorial(lugares){

        let aux = []
        this.historial.forEach(e=>{
            if (!lugares.includes(e)){
                aux.push(e)
            }
        })

        this.historial = aux;
        this.guardarEnArchivo()

    }


}


module.exports = Busquedas