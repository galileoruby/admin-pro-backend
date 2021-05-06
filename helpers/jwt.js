const jwt = require('jsonwebtoken');



const generarJWT = (uid, email) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid,
            email
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        }, (error, token) => {

            if (error) {
                // console.log(error);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });


    });



}

module.exports={
    generarJWT
}