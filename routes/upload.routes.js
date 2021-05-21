
/*
    Ruta : api/upload/{}
*/


const { Router } = require('express');

// check is obsoleted
const { body } = require('express-validator');

const { validarCamposGeneric } = require('../middleware/campos.Validate');
const { validarJWT } = require('../middleware/validar-jwt');

const { uploadFile, retornaImagen } = require('../controllers/upload.controller');
const expressuploadFile = require('express-fileupload');






const router = Router();


router.use(expressuploadFile());

router.put('/:tipo/:id',
    [validarJWT],
    uploadFile);


router.get('/:tipo/:foto',
    [validarJWT],
    retornaImagen);



module.exports = router