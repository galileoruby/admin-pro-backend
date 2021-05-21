
/*
    Ruta : api/todo
*/


const { Router } = require('express');

// check is obsoleted
const { body } = require('express-validator');

const { validarCamposGeneric } = require('../middleware/campos.Validate');
const { validarJWT } = require('../middleware/validar-jwt');

const { buscarTodo, getDocumentosColeccion } = require('../controllers/busqueda.controller');






const router = Router();



// router.put('/:id',

router.get('/:search',
    [
        validarJWT
    ],
    buscarTodo);


router.get('/coleccion/:tabla/:search',
    [
        validarJWT
    ],
    getDocumentosColeccion);



module.exports = router