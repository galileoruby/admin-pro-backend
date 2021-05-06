

require('dotenv').config();

const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');




//crear el servidor express 
const app = express();


//aplicacion de cors
app.use(cors());


//lectura y parseo de body
app.use(express.json());



dbConnection();


app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));



app.listen(process.env.PORT, () => {

    // console.log('servidor corriendo ', process.env.PORT);
});