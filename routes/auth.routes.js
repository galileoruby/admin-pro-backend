/*
 * Path : 'api/login 
 * 
*/

const { Router } = require('express');
const { login, googleSingIn , renewToken} = require('../controllers/auth.controller')
const { body } = require('express-validator');
const { validarCamposAuth } = require('../middleware/auth.validate');

const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();



router.post('/',
    [

        body('email', 'Email requerido').isEmail(),
        body('password', 'Password requerido').notEmpty(),
        validarCamposAuth
    ],
    login
);


router.post('/google',
    [

        body('token', 'Token google es requerido').notEmpty(),
        validarCamposAuth
    ],
    googleSingIn
);

router.get('/renew',
    validarJWT,
    renewToken

);






module.exports = router;