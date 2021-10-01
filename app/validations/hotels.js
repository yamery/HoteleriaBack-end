const { httpError } = require('../helpers/handleError')
const hotelModel = require("../models/Hotel");
const fs = require('fs-extra');
const path = require('path');

const validForm = async(req, res, next) => {
    try {
        console.log(req.body)
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
        console.log(req.body)
        const { nombre } = req.body;
        const hotels = await hotelModel.findOne({ nombre: removerDecoradores(nombre) }, { _id: 0, nombre: 1 }) || null
        if (!!hotels) { //verificar de forma boolanea si hotel tiene datos o esta vacio
            await fs.unlink(path.resolve(req.file.path));
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

const validExistDelUpd = async(req, res, next) => {
    try {

        const { id } = req.params;
        const hotel = await hotelModel.findById(id);
        if (!(!!hotel)) {
            res.json({
                status: 403,
                data: null,
                msg: `No existe un hotel con id ${id}`
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


module.exports = { validExist, removerDecoradores, validForm, validExistDelUpd }