const { httpError } = require('../helpers/handleError')
const hotelModel = require("../models/Hotel");

const validForm = async(req, res, next) => {
    try {

        const {
            nombre,
            descripcion,
            horarios
        } = req.body;
        console.log(req.body)
        if (!!nombre && !!descripcion && !!horarios.checkIn && !!horarios.checkOut) {
            next();
        } else {
            res.json({
                status: 403,
                data: null,
                msg: "Faltan campos obligatorios"
            });
        }
    } catch (err) {
        httpError(res, err);
    }
}

const validExist = async(req, res, next) => {
    try {

        const { nombre } = req.body;
        const hotels = await hotelModel.findOne({ nombre: removerDecoradores(nombre) }, { _id: 0, nombre: 1 }) || null
        if (!!hotels) { //verificar de forma boolanea si hotel tiene datos o esta vacio
            res.json({
                status: 403,
                data: null,
                msg: `Ya se existe un hotel ${nombre}`
            });
        } else {
            next();
        }
    } catch (err) {
        httpError(res, err);
    }
}
const removerDecoradores = (string) => {
    const acentos = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    return string.trim().split('').map(letra => acentos[letra] || letra).join('').toString();
}


module.exports = { validExist, removerDecoradores, validForm }