const inquirer = require('inquirer');
//import inquirer from 'inquirer';

require('colors');

const preguntas = [
    {

        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 3,
                name: `${'3.'.green} Borrar del historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },

        ]
    }
]

const listarLugares = async (lugares) => {
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}`.green
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    })

    choices.unshift({
        value: 0,
        name: '0.'.green + ' Cancelar'
    })


    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione un lugar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}


const mostrarListadoCheckList = async (historialList) => {

    const choices = historialList.map((historial, i) => {
        const idx = `${i + 1}.`.green
        return {
            value: historial,
            name: `${idx} ${historial}`,
            checked: false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;

}

const inquirerMenu = async () => {
    console.clear();
    console.log('========================='.green);
    console.log('  Seleccione una opción'.blue);
    console.log('=========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion;

}


const pausa = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'enter'.green} para continuar\n`
        }
    ]

    console.log('\n');

    await inquirer.prompt(question)
}


const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}


module.exports = {
    listarLugares,
    leerInput,

    inquirerMenu,
    pausa,
    confirmar,
    mostrarListadoCheckList
}