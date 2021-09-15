const { model } = require('mongoose');
const { httpError } = require('../helpers/handleError')
const hotelModel = require('../models/Hotel')


const getHotels = async(req, res) => {
    const response = await hotelModel.find({});
    try {
        res.json({
            status: 200,
            data: response,
            msg: null
        });
    } catch (err) {
        httpError(res, err)
    }
}

const getHotel = async(req, res) => {
    try {
        const response = await hotelModel.findById(req.params.id);
        if (!response) {
            res.status(404).json({ msg: 'No existe el hotel' })
        }
        res.json({
            status: 200,
            data: response,
            msg: null
        });
    } catch (err) {
        httpError(res, err)
    }
}

const createHotel = async(req, res) => {
    try {
        const { nombre, servicios, descripcion, horarios } = req.body;
        console.log(servicios)
        const resDetail = await hotelModel.create({ nombre, servicios, descripcion, horarios });
        res.json({
            status: 201,
            data: resDetail,
            msg: "Hotel Creado"
        });
    } catch (err) {
        httpError(res, err);
    }
}

const updateHotel = async(req, res) => {
    try {
        const { id } = req.params;
        const { nombre, servicios, descripcion, horarios } = req.body;
        const response = await hotelModel.findById(req.params.id);
        if (!response) {
            res.status(404).json({ msg: "No existe el hotel" })
        }

        const response2 = await hotelModel.findByIdAndUpdate(
            id, {
                nombre,
                servicios,
                descripcion,
                horarios
            }, { new: true })
        res.json({
            status: 201,
            data: response2,
            msg: "Hotel Actualizado"
        });
    } catch (err) {
        httpError(res, err);
    }
}

const deleteHotel = async(req, res) => {
    try {
        const { id } = req.params;
        const response = await hotelModel.findByIdAndDelete(id);
        res.json({
            status: 200,
            data: response,
            msg: "Hotel Eliminado"
        });
    } catch (err) {
        httpError(res, err);
    }
}

module.exports = { getHotel, getHotels, createHotel, updateHotel, deleteHotel }