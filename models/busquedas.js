const axios = require('axios')

class Busquedas{

    historial = ['Tegucigalpa', 'Madrid', 'San Jose'];

    constructor(){
        
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language':'es'
        }
    }

    async ciudades(lugar){
        try{

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            })

            const resp = await instance.get();

            console.log(instance.baseURL);
            console.log(resp.data);

            return []
            
        }catch(error){
            console.log("error");
            console.log(error);

            return [];
        }

    }

}


module.exports = Busquedas