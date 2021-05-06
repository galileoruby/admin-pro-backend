/*
 * Path : 'api/login 
 * 
*/

const { Router } = require('express');
const { login } = require('../controllers/auth.controller')
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

)





module.exports = router;