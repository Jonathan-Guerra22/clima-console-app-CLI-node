require('dotenv').config();

const { leerInput, inquirerMenu, pausa, listarLugares } = require("./helpers/inquirers");
const Busquedas = require("./models/Busquedas");

const main = async () => {

    let opt;

    const busquedas = new Busquedas();

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad');
                const lugares = await busquedas.ciudades(termino)
                if (lugares.length === 0) {
                    console.log('No se encontraron coincidencias con el lugar ingresado :: '.yellow + termino.red);
                    break;
                }

                const id = await listarLugares(lugares);

                if (id === 0) {
                    continue;
                }

                const lugarSeleccionado = lugares.find(l => l.id === id)
                console.log(lugarSeleccionado);

                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng)

                console.clear();

                console.log('\nInformacion de la ciudad:\n'.green);
                console.log('Ciudad: '.yellow + lugarSeleccionado.nombre);
                console.log('Codigo Corto: '.yellow + ((lugarSeleccionado.short_code === undefined)
                                                                ? 'No tiene'
                                                                : lugarSeleccionado.short_code)
                );

                console.log('\nLatitud: '.yellow + lugarSeleccionado.lat);
                console.log('Longitud: '.yellow + lugarSeleccionado.lng);

                if (clima.length === 0){
                    console.log('\n\nNo se pudo obtener la informacion del clima, intente mas tarde'.red);
                    break;
                }

                const celcius = ' °C'.blue;
                const grados = ' °'.blue;
                const metrosSeg = ' mts/s'.blue;
                const metros = ' mts'.blue;
                const hPa = ' hPa'.blue;
                const percentage = ' %'.blue;

                console.log('\nTemperatura:'.green);
                console.log('Temperatura Actual: '.yellow + clima.main.temp + celcius);
                console.log('Minima: '.yellow + clima.main.temp_min + celcius);
                console.log('Maxima: '.yellow + clima.main.temp_max + celcius);

                console.log('\nMas info:'.green);
                console.log('Descripcion: '.yellow + clima.weather[0].description);
                console.log('Presión: '.yellow + clima.main.pressure + hPa);
                console.log('Humedad: '.yellow + clima.main.humidity + percentage);
                console.log('Visibilidad: '.yellow + clima.visibility + metros);

                console.log('\nViento:'.green);
                console.log('Velocidad: '.yellow + clima.wind.speed + metrosSeg);
                console.log('Direccion del Viento: '.yellow + clima.wind.deg + grados);
                console.log('Nubosidad: '.yellow + clima.clouds.all + percentage);

                break;

            case 2:

                break;
        }

        if (opt !== 0) {
            await pausa();
        }

    } while (opt !== 0);
}


main()