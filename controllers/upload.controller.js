
const path = require('path');
const fs = require('fs');

const { response } = require('express')
const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-Imagen');




const uploadFile = async (req, res = response) => {


    const { tipo, id } = req.params;
    const regex = new RegExp(tipo, 'i');




    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];


    if (!tiposPermitidos.includes(tipo)) {

        return res.status(400).json({
            ok: true,
            msg: 'tipo debe ser hospitales,medicos,usuarios'
        });
    }


    //validar que exista archivo
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(404).json({
            ok: true,
            msg: 'Necesario archivo para guardar'
        });
    }


    //Procesar la imagen      
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.');

    let extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //validar extension

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    console.log(`extensionArchivo: ${extensionArchivo}`);

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(404).json({
            ok: true,
            msg: 'No es una extensión permitida'
        });
    }


    //generar el nombre del archivo.
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;


    //path imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;


    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: ' Error al mover imagen'
            })

        }
        // res.send('File uploaded!');
    });



    actualizarImagen(tipo, id, nombreArchivo);

    res.status(200).json({
        ok: true,
        msg: 'archivo subido',
        tipo,
        path,
        id
    });


}



const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    let pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto.
    if (!fs.existsSync(pathImg)) {
         pathImg = path.join(__dirname, `../uploads/NoImage.png`);
    }

    res.sendFile(pathImg);




}

module.exports = {
    uploadFile,
    retornaImagen
}