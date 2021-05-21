
/*
    Ruta : api/medicos
*/




const { Router } = require('express');

// check is obsoleted
const { check, body } = require('express-validator');
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
    ],
    putMedico
);

router.delete('/:id',
    deleteMedicoById
);

module.exports = router