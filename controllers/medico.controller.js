const { response } = require('express');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');


const getMedico = async (req, res = response) => {



    const medicos = await Medico
        .find()
        .populate('usuario', 'nombre')
        .populate('hospital', 'nombre _id')
        .sort({ nombre: 'asc' });


    try {

        res.status(200).json({
            ok: true,
            medicos
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        });
    }
}

const crearMedico = async (req, res = response) => {


    //validar que exista hospital
    const uid = req.uid;
    const hospital = req.body.hospitalId;

    const existsHospital = await Hospital.findById({ _id: hospital });


    if (!existsHospital) {
        return res.status(404).json({
            ok: false,
            msg: 'Hospital no existe o no es válido'
        });
    }


    try {

        const newMedico = new Medico({
            usuario: uid,
            hospital,
            ...req.body
        });




        const medicoDB = await newMedico.save();

        res.status(200).json({
            ok: true,
            medicoDB
        });

    } catch (err) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })

    }

}


const putMedico = async (req, res = response) => {

    /*
    a. solicitar nombre medico
    b. solictar id hospital
    */


    const idMedico = req.params.id;
    const idHospital = req.body.hospitalId;
    const idUsuario = req.uid;


    const nombreMedico = req.body.nombre;


    try {

        const medicoDb = await Medico.findById(idMedico);

        if (!medicoDb) {

            return res.status(404).json({
                ok: false,
                msg: 'Medico no encontrado',
                idMedico
            });
        }




        

        const hospitalDb = await Hospital.findById(IdHospital);



        if (!hospitalDb) {


            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
                IdHospital
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario: idUsuario,
            hospital: idHospital
        };


        const medicoActualizado = await Medico.findByIdAndUpdate(idMedico, cambiosMedico, { new: true });


        res.status(200).json({

            ok: true,
            medico: medicoActualizado
        });

    } catch (error) {

        console.log(`Error actualizar medico:: ${error}`);

        res.status(500).json({
            ok: true,
            msg: 'Hable con administrador, actualizar medico'
        });


    }


}



const deleteMedicoById = async (req, res = response) => {



    const idMedico = req.params.id;

    try {


        const medicoDb = await Medico.findById(idMedico);


        if (!medicoDb) {
            return res.status(404).json({

                ok: false,
                msg: 'Medico no encontrado.'
            });


        }


        await Medico.findByIdAndDelete(idMedico);



        res.json({
            ok: true,
            msg: 'Medico eliminado',
            idMedico
        })

    } catch (error) {

        console.log(`Error eliminar medico:: ${error}`);
        res.json({
            ok: false,
            msg: 'Error al eliminar medico, contacte administrador'
        })


    }


}



module.exports = {
    getMedico,
    deleteMedicoById,
    putMedico,
    crearMedico
}