const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {


    const { email, password } = req.body;


    try {




        // verificar email
        const usuarioDB = await Usuario.findOne({ email });



        if (!usuarioDB) {

            return res.status(404).json({
                ok: false,
                msg: "Usuario no válido"
            });
        }


        //verificar contraseña
        const validarPassw = bcrypt.compareSync(password, usuarioDB.password);


        if (!validarPassw) {

            return res.status(400).json({
                ok: false,
                msg: "Contraseña no válida"
            });
        }



        //Generar el token TWJ 
        const token = await generarJWT(usuarioDB.id, usuarioDB.email);




        res.json({
            ok: true,
            token
        });



    } catch (error) {

        console.log(error);
        res.status(500).json({

            ok: false,
            msg: 'Hable con el administrador'
        });

    }


}



module.exports = {
    login
}