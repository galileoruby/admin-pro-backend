
/*
    Ruta : api/medicos
*/




const { Router } = require('express');

// check is obsoleted
const { check, body, header } = require('express-validator');
const { validarCamposGeneric } = require('../middleware/campos.Validate');
const { validarJWT } = require('../middleware/validar-jwt');




const {
    getMedico,
    deleteMedicoById,
    putMedico,
    crearMedico
} = require('../controllers/medico.controller');




const router = Router();





router.get('/', getMedico);

router.post('/',
    [
        body('nombre', 'Nombre es requerido').notEmpty(),
        body('hospitalId', 'Hospital id debe ser válido').isMongoId(),
        validarCamposGeneric,
        validarJWT
    ],
    crearMedico
);


router.put('/:id',
    [
        body('hospitalId', 'Hospital id debe ser válido').isMongoId(),
        body('nombre', 'Nombre medico es requerido').notEmpty(),
        validarCamposGeneric,
        validarJWT
    ],
    putMedico
);

router.delete('/:id',
    [         
        validarCamposGeneric,
        validarJWT
    ],
    deleteMedicoById
);

module.exports = router