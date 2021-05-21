/*
    Ruta : api/usuarios
*/


const { Router } = require('express');
const { getUsuarios, crearUsuario, putUsuarios, deleteUsuarioById } = require('../controllers/usuario.controller');
// check is obsoleted
const { check, body } = require('express-validator');
// const { validarCampos } = require('../middleware/usuarios.validate');
const { validarCamposGeneric } = require('../middleware/campos.Validate');




const { validarJWT } = require('../middleware/validar-jwt');


const router = Router();





router.get('/', validarJWT, getUsuarios);

router.post('/',
    [
        validarJWT,
        body('nombre', 'Nombre es obligatorio').not().isEmpty(),
        body('password', 'Password es obligatorio').not().isEmpty(),
        body('email', 'Email no es valido').isEmail(),
        validarCamposGeneric,
    ],
    crearUsuario)


router.put('/:id',
    [
        validarJWT,
        body('nombre', 'Nombre es obligatorio').not().isEmpty(),
        body('email', 'Email es obligatorio').isEmail(),
        body('role', 'Role es obligatorio').not().isEmpty(),
        validarCamposGeneric
    ],
    putUsuarios
);

router.delete('/:id',
    validarJWT,
    deleteUsuarioById


);

module.exports = router