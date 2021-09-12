const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    }
}, {
    versionKey: false
})

module.exports = mongoose.model('Hotel', HotelSchema);