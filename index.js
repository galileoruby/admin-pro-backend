

require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');




//crear el servidor express 
const app = express();

app.use(cors());


dbConnection();






app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        msg: 'hola express',
        msx: 'ola q ase'
    });

});

app.listen(process.env.PORT, () => {

    console.log('servidor corriendo ', process.env.PORT);
});