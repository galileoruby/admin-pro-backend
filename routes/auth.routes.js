/*
 * Path : 'api/login 
 * 
*/

const { Router } = require('express');
const { login, googleSingIn } = require('../controllers/auth.controller')
const { body } = require('express-validator');
const { validarCamposAuth } = require('../middleware/auth.validate');


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





module.exports = router;