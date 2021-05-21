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


const putMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post  PutMedico'
    })
}



const deleteMedicoById = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post  DeleteMedicoById'
    })
}



module.exports = {
    getMedico,
    deleteMedicoById,
    putMedico,
    crearMedico
}