
const Usuario = require('../models/usuario.model');

const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {


    const usuarios = await Usuario
        .find()
        .sort({ email: 'asc' });
    res.status(200).json({
        usuarios,
        uid: req.uid
    });

};

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                msg: `El correo ${email} ya esta registrado.`
            });
        }

        const usuario = new Usuario(req.body);



        // encriptar contraseña
        const salt = bcrypt.genSaltSync();

        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar el token TWJ 
        const token = await generarJWT(usuario.id, usuario.email);


        res.status(200).json({
            newUser: true,
            usuario,
            token
        });


    } catch (error) {
        // console.log(error);
        res.status(500).json({

            detalle: 'revisar error',
            msg: error
        });
    }



};



const putUsuarios = async (req, res = response) => {

    const uid = req.params.id;

    try {


        const usuarioDB = await Usuario.findById({ _id: uid });



        if (!usuarioDB) {

            return res.status(404).json({


                detalle: 'Error inesperado',
                msg: 'No existe un usuario por ese id'
            });
        }

        //actualizaciones



        const { password, google, email, ...camposBody } = req.body;



        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, camposBody, { new: true });




        res.status(200).json({
            uid,
            usuario: usuarioActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            detalle: 'Error inesperado',
            msg: error
        });
    }

}


const deleteUsuarioById = async (req, res = response) => {


    const uid = req.params.id;


    const usuarioDB = await Usuario.findById({ _id: uid });



    if (!usuarioDB) {

        return res.status(404).json({


            detalle: 'Error inesperado',
            msg: 'No existe un usuario por ese id'
        });
    }

    try {



        await Usuario.findByIdAndDelete(uid);


        res.status(200).json({
            uid,
            usuario: 'usuario borrado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({

            detalle: 'Error inesperado',
            msg: error
        });
    }


}


module.exports = {
    getUsuarios,
    crearUsuario,
    putUsuarios,
    deleteUsuarioById
}