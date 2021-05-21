
const { response } = require('express');

const { validationResult } = require('express-validator');

const validarCamposHospital = (req, res, next) => {


    const errores = validationResult(req);

    // console.log('errores.isEmpty()', errores.array())
    if (!errores.isEmpty()) {

        return res.status(400).json({
            errors: errores.array()
        });
    }


    next();

}



module.exports = {
    validarCamposHospital
}