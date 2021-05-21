const { response } = require('express')
const Hospital = require('../models/hospital.model');

const getHospitales = async (req, res = response) => {


    const hospitales = await Hospital    
        .find()
        .populate('usuario','nombre img')
        .sort({ nombre: 'asc' });

    try {
        res.status(200).json({
            ok: true,
            hospitales
        })

    } catch (erro) {

        res.status(500).json({
            ok: false,
            msg: 'hable con administrador'
        })

    }

}

const crearHospital = async (req, res = response) => {


    //validar que hospital exista




    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {

        const hospitalDB = await hospital.save();

        res.status(200).json({
            ok: true,
            msg: hospitalDB
        })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }


}


const putHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post  PutHospital'
    })
}



const deleteHospitalById = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'post  DeleteHospitalById'
    })
}



module.exports = {
    getHospitales,
    deleteHospitalById,
    putHospital,
    crearHospital
}