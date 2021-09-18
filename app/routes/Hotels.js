const express = require('express')
const router = express.Router()
const { getHotel, getHotels, createHotel, updateHotel, deleteHotel, filtrarHoteles } = require('../controlles/Hotels')
const checkOrigen = require('../middleware/origen')
const { validExist, validForm } = require('../validations/hotels')

router.get('/', getHotels)

router.get('/:id', getHotel)

router.post('/', checkOrigen, validExist, validForm, createHotel)

router.put('/:id', checkOrigen, validForm, updateHotel)

// actualizar visualizacion
// router.patch('/:id', updateHotel)

router.delete('/:id', deleteHotel)


router.get('/filtrado/:parametros', filtrarHoteles)

module.exports = router