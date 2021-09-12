const { httpError } = require('../helpers/handleError')
const hotelModel = require("../models/Hotel");

const validExist = async(req, res, next) => {
    try {
        const { nombre } = req.body;
        const hotels = await hotelModel.findOne({ nombre: removerDecoradores(nombre) }, { _id: 0, nombre: 1 }) || null
        if (!!hotels) {
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
    const sin = string.trim().split('').map(letra => acentos[letra] || letra).join('').toString();
    console.log("sin decoradores" + sin)
    return sin;
}


module.exports = { validExist, removerDecoradores }