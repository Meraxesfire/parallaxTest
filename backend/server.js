//CARGO AQUI LOS RECURSOS que voy a necesitar-------------------------------------------------------------------
const express= require('express'); //esta permite crear rutas y manejar peticiones http
const cors = require('cors');//esta carga el middleware cors para que el navegador no bloquee la conexion front-back al estar en dominios diferentes
const mysql2 = require('mysql2');//esta envia sentencias sql
require('dotenv').config();//esta carga la configuracion del archivo .env para usar las variables de entorno que he definido ahi

const app= express();//inicializa la instancia de la aplicacion express.

//MIDDELEWARES--------------------------------------------------------------------------------------------------
app.use(cors()); //aqui mi frontend va a poder hacer peticiones a mi backend. 
app.use(express.json());//para que el backend pueda entender los datos que le llegan en formato json, los convierte en objeto javascript para que pueda trabajar con ellos.

//CONEXION A LA BASE DE DATOS----------------------------------------------------------------------------------
const db=mysql2.createConnection({
    host:process.env.DB_HOST, //con process.env leemos los datos de la comunicacion con la base de datos que he definido en el archivo .env y que no quiero que se vean en el codigo fuente por seguridad, ya que ahi tengo el usuario y la contraseña de la base de datos.
    user:process.env.DB_USER, //si se cambia de bbdd, solo hay que cambiar el archivo .env y no el codigo fuente.
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});

//control de error de conexion a la bbdd
db.connect(err=>{
    if(err){
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


//CREAR 2 RUTAS EN LA CONEXION, una para mandar y otra para recibir datos-------------------------------------

//1 - ENVIAR datos (formulario de contacto)
app.post('/api/contact', (req,res)=>{//app.post define que esta ruta solo acepta POST
                                    //'/api/contact' es la ruta a la que el frontend va a enviar los datos del formulario de contacto.
    const {nombre,email,telefono,mensaje}=req.body; //aqui recibo los datos que me manda el frontend en formato json, y los convierto en variables para poder trabajar con ellas.
    const sql='INSERT INTO contactos (nombre, email, telefono, mensaje) VALUES (?, ?, ?, ?)'; //aqui creo la sentencia sql para insertar los datos en la tabla contactos de la base de datos. Uso ? para evitar inyecciones sql.
    db.query(sql,[nombre,email,telefono,mensaje],(err,result)=>{
        if(err) return res.status(500).send(err); //si hay un error en la consulta sql, envio un error 500 al frontend con el mensaje de error.
        res.status(200).json('Mensaje recibido correctamente'); //si todo va bien, envio un mensaje de exito al frontend.
    });
});


//2 - TOMAR datos (fotos de galería)
app.get('/api/galeria',(req,res)=>{ //app.get define que esta ruta solo acepta GET, es decir, solo se puede pedir información, no enviar.
    const sql='SELECT * FROM fotos'; //aqui creo la sentencia sql para seleccionar todos los datos de la tabla galeria de la base de datos.
    db.query(sql,(err,result)=>{
        if(err) return res.status(500).send(err); //si hay un error en la consulta sql, envia un error 500 al frontend con el mensaje de error.
        res.json(result); //si todo va bien, envio los datos de la galeria al frontend en formato json.
    });
});


//DEFINIR EL PUERTO EN EL QUE VA A CORRER EL SERVIDOR------------------------------------------------------
const PORT = process.env.PORT || 3000; //aqui defino el puerto en el que va a correr el servidor, si no se define en el archivo .env, por defecto va a ser el 3000.
app.listen(PORT,()=>{ //app.listen "enciende" el servidor y lo deja escuchando peticiones en el puerto definido, y ejecuta la funcion que le paso como segundo parametro cuando el servidor esta listo para recibir peticiones. 
    console.log(`Server running on port ${PORT}`);
});