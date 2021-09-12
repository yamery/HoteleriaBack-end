const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    servicios: {
        type: [String]
    },
    descripcion: {
        type: String,
        required: true
    },
    horarios: {
        checkIn: {
            type: String,
            required: true
        },
        checkOut: {
            type: String,
            required: true
        }
    }

}, {
    versionKey: false
})

module.exports = mongoose.model('Hotel', HotelSchema);