const { Schema, model } = require('mongoose');



const MedicoSchema = Schema({
    
    nombre: {
        type: String,
        required: true
    },
    img: {

        type: String,
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        require: true
    }
}, { collection: 'medicos' });


MedicoSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.uid = _id;
    return object;
})


module.exports = model('Medico', MedicoSchema);