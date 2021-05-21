const Usuario = require('../models/usuario.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const fs = require('fs');

const borrarImagen = async (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    const tiposPermitidos = ['hospitales', 'medicos', 'usuarios'];

    let pathViejo = '';



    switch (tipo) {


        case 'medicos': {

            const medico = await Medico.findById(id);


            if (!medico) {
                console.log('no es un medico por id');
                return false;
            }


            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);



            medico.img = nombreArchivo;
            await medico.save();
            return true;
        }

            break;


        case 'hospitales': {

            const hospital = await Hospital.findById(id);


            if (!hospital) {
                console.log('no es un medico por id');
                return false;
            }


            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);



            hospital.img = nombreArchivo;
            await hospital.save();
            return true;




        }
            break;


        case 'usuarios':
            {

                const usuario = await Usuario.findById(id);


                if (!usuario) {
                    console.log('no es un usuario por id');
                    return false;
                }
    
    
                pathViejo = `./uploads/usuarios/${usuario.img}`;
                borrarImagen(pathViejo);
    
    
    
                usuario.img = nombreArchivo;
                await usuario.save();
                return true;

            }
            break;



    }




}

module.exports = {
    actualizarImagen
}