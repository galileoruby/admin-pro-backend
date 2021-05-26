const { response } = require('express')
const Hospital = require('../models/hospital.model');

const getHospitales = async (req, res = response) => {


    const hospitales = await Hospital
        .find()
        .populate('usuario', 'nombre img')
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


const putHospital = async (req, res = response) => {



    const IdHospital = req.params.id;
    const idUsuario = req.uid;

    try {




        const hospitalDb = await Hospital.findById(IdHospital);



        if (!hospitalDb) {


            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado',
                IdHospital
            });
        }


        const cambiosHospital = {
            ...req.body,

            usuario: idUsuario
        };


        await hospitalDb.save();


        const hospitalActualizado = await Hospital.findByIdAndUpdate(IdHospital, cambiosHospital, { new: true });

        res.status(200).json({
            ok: true,
            hospitalActualizado

        });


    } catch (error) {

        console.log(`Error actualizar Hospital:: ${error}`);
        res.status(500).json({
            ok: true,
            msg: 'Hable con administrador'
        })

    }


}



const deleteHospitalById = async (req, res = response) => {



    const IdHospital = req.params.id;


    try {




        const hospitalDb = await Hospital.findById(IdHospital);



        if (!hospitalDb) {


            return res.status(404).json({
                ok: false,
                msg: 'Hospital no encontrado',
                IdHospital
            })
        }





        const hospitalActualizado = await Hospital.findByIdAndDelete(IdHospital);

        res.status(200).json({
            ok: true,
            msg: 'Hospital Eliminado'

        });


    } catch (error) {

        console.log(`Error actualizar Hospital:: ${error}`);
        res.status(500).json({
            ok: true,
            msg: 'Hable con administrador'
        })

    }

}



module.exports = {
    getHospitales,
    deleteHospitalById,
    putHospital,
    crearHospital
}