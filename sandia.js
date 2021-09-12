// const express = require('express');
// const conectarDB = require('./config/db');
// const bodyParser = require('body-parser');



// //creamos servidor
// const app = express()
//     //Configurar puerto
// var port = process.env.PORT || 3000
//     //Indicar archivo de rutas a usar
// let routes = require("./routes/routes");

// app.use(express.urlencoded({extended: true}))
// app.use(express.json())

//     // la ruta se llamara ahora /api para acceder a las rutas
// app.use('/api', routes);

// app.get('*', (req, res) => {
//     res.status(404)
//     res.send({ error: 'Url Not found' })
// })

// //Conexion Base de datos
// conectarDB();

// //prueba de servidor
// app.listen(port, () => {
//     console.log("Servidor Corriendo")
// })