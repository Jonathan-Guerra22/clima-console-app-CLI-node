require('dotenv').config();

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirers");
const Busquedas = require("./models/Busquedas");

const main = async()=>{

    let opt;

    const busquedas = new Busquedas();

    do{

        opt = await inquirerMenu();

        switch(opt){
            case 1:
                const lugar = await leerInput('Ciudad');
                await busquedas.ciudades(lugar)

                break;

            case 2:

                break;
        }

        if(opt !== 0){
            await pausa();
        }
        
    }while( opt !==0 );
}


main()