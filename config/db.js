const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Hotel');

const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, res) => {
        if (!err) {
            console.log("¡Conexion Correcta!")
        } else {
            console.log("¡ERROR BASE DE DATOS!")
        }
    })
}



module.exports = { dbConnect };