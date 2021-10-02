const { model } = require('mongoose');
const { httpError } = require('../helpers/handleError')
const hotelModel = require('../models/Hotel')
const fs = require('fs-extra');
const path = require('path')

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
        console.log(req.body)
        const imgPath = req.file.path

        const { nombre, descripcion, checkIn, checkOut } = req.body;
        const servicios = JSON.parse(req.body.servicios).servicios


        const horarios = { checkIn, checkOut }
        const resDetail = await hotelModel.create({ nombre, servicios, descripcion, horarios, imgPath });
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
        const imgPath = req.file.path;
        const { nombre, descripcion, checkIn, checkOut } = req.body;
        const horarios = { checkIn, checkOut }
        const servicios = JSON.parse(req.body.servicios).servicios
        const response = await hotelModel.findById(req.params.id);

        if (!response) {
            res.status(404).json({ msg: "No existe el hotel" })
        } else {
            await fs.unlink(path.resolve(response.imgPath));
            const response2 = await hotelModel.findByIdAndUpdate(
                id, {
                    nombre,
                    servicios,
                    descripcion,
                    horarios,
                    imgPath
                }, { new: true })
            res.json({
                status: 201,
                data: response2,
                msg: "Hotel Actualizado"
            });
        }
    } catch (err) {
        httpError(res, err);
    }
}

const deleteHotel = async(req, res) => {
    try {
        const { id } = req.params;
        const hotel = await hotelModel.findById(id);
        const response = await hotelModel.findByIdAndDelete(id);
        if (response) {
            await fs.unlink(path.resolve(hotel.imgPath));
        }
        res.json({
            status: 200,
            data: response,
            msg: "Hotel Eliminado"
        });
    } catch (err) {
        httpError(res, err);
    }
}


const filtrarHoteles = async(req, res) => {
    const { parametros } = req.params;
    const busq = parametros.split("+")
    busq.pop();
    const response = await hotelModel.find({ servicios: { $all: busq } });
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


module.exports = { getHotel, getHotels, createHotel, updateHotel, deleteHotel, filtrarHoteles }