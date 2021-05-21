const { response } = require('express')
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
// const { search } = require('../routes/hospitales.routes');




const buscarTodo = async (req, res = response) => {


    const { search } = req.params;
    const regex = new RegExp(search, 'i');



    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ "nombre": regex })
            .populate('usuario', 'nombre img')
            .sort({ nombre: 'asc' }),
        Medico.find({ "nombre": regex })
            .populate('usuario', 'nombre img')
            .sort({ nombre: 'asc' }),
        Hospital.find({ "nombre": regex })
            .populate('usuario', 'nombre img')
            .sort({ nombre: 'asc' })

    ]).catch((error) => {
        res.status(500).json({
            ok: false,
            msg: 'hable con administrador'
        })

    });


    try {
        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        });

    } catch (erro) {

        res.status(500).json({
            ok: false,
            msg: 'hable con administrador'
        })

    }

}


const getDocumentosColeccion = async (req, res = response) => {


    const { search, tabla } = req.params;

    const regex = new RegExp(search, 'i');


    let data = [];


    console.log(`search ${search}, tabla: ${tabla}`);









    try {

        switch (tabla) {

            case 'medicos':



                data = await Medico.find({ "nombre": regex })
                    .populate('usuario', 'nombre img')
                    .populate('hospital', 'nombre img')
                    .sort({ nombre: 'asc' });


                break;

            case 'hospitales':



                data = await Hospital.find({ "nombre": regex })
                    .populate('usuario', 'nombre img')
                    .sort({ nombre: 'asc' });



                break;

            case 'usuarios':

                data = await Usuario.find({ "nombre": regex })
                    .populate('usuario', 'nombre img')
                    .sort({ nombre: 'asc' });


                break;

            default:

                return res.status(400).json({
                    ok: false,
                    msg: ' Tablas permitidas: hospitales,medicos,usuarios'
                });
        }

        res.status(200).json({
            ok: true,
            query: data
        });

    } catch (erro) {

        res.status(500).json({
            ok: false,
            msg: 'hable con administrador',
            erro
        })

    }

}


module.exports = {
    buscarTodo,
    getDocumentosColeccion
}