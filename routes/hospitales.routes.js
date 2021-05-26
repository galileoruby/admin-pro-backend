
/*
    Ruta : api/hospitales
*/


const { Router } = require('express');

// check is obsoleted
const { check, body } = require('express-validator');

const { validarCamposGeneric } = require('../middleware/campos.Validate');
const { validarJWT } = require('../middleware/validar-jwt');

const { getHospitales,
    deleteHospitalById,
    putHospital,
    crearHospital
} = require('../controllers/hospital.controller');




const router = Router();





router.get('/',
    [
        validarJWT
    ],
    getHospitales);

router.post('/',
    [
        body('nombre', 'Nombre es requerido').notEmpty(),
        validarCamposGeneric,
        validarJWT
    ],
    crearHospital)


router.put('/:id',
    [
        validarJWT,
        body('nombre', 'Nombre es requerido').notEmpty(),
        validarCamposGeneric
    ],
    putHospital
);

router.delete('/:id',
    [
        validarJWT
    ],
    deleteHospitalById
);

module.exports = router