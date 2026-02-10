const express= required('express');
const cors = require('cors');
const mysql2 = require('mysql2');
require('dotenv').config();

const app= express();

//MIDDELEWARES
app.use(cors); //aqui mi frontend va a poder hacer peticiones a mi backend
app.use(express.json());//para que el backend pueda entender los datos que le llegan en formato json

//CONEXION A LA BASE DE DATOS
const db=mysql2.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    name:process.env.DB_NAME
});

//control de error de conexion a la bbdd
db.connect(err=>{
    if(err){
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

//Ahora creamos 2 rutas en la conexion, una para mandar y otra para recibir datos
//1 - RECIBIR datos (formulario de contacto)





//2 - MANDAR datos (fotos de galería)