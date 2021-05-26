const { response } = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const { serializeError, deserializeError } = require('serialize-error');


const { googleVerify } = require('../helpers/google-verify');

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



const googleSingIn = async (req, res = response) => {


    // 
    const googleToken = req.body.token;

    let name, picture, email;
    try {
        var googleUser = await googleVerify(googleToken);

    } catch (err) {


        const serialized = serializeError(err)
        // console.log(`errror:::serializado ${serialized}`);
        // console.log(`err:: ${err}`);

        res.status(404).json({
            ok: false,
            // msg: 'Token no es correcto',
            msg: serialized.message
            // msgx:err
        });

        return;
    }

    name = googleUser.name;
    picture = googleUser.picture;
    email = googleUser.email;

    console.log(name);
    console.log(email);
    console.log(picture);

    const usuarioDb = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDb) {
        usuario = new Usuario({
            nombre: name,
            email,
            password: '@@@',
            img: picture,
            google: true

        });
    } else {
        //existe usuario

        usuario = usuarioDb;
        usuario.google = true;
        // usuario.password='@@@';

    }

    await usuario.save();



    const token = await generarJWT(usuario.id, usuario.email);

    return res.status(200).json({
        ok: true,
        token
    });

}



const renewToken = async (req, res = reponse) => {

    const uid = req.uid;


    const usuario = await Usuario.findById( uid );


    //generar token JWT
    const token = await generarJWT(usuario.id, usuario.email);


    res.json({
        ok: true,
        uid,
        token

    });

}




module.exports = {
    login,
    googleSingIn,
    renewToken
}