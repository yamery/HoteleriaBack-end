const express = require('express')
const router = express.Router()
const { getHotel, getHotels, createHotel, updateHotel, deleteHotel, filtrarHoteles } = require('../controlles/Hotels')
const checkOrigen = require('../middleware/origen')
const { validExist, validForm, validExistDelUpd } = require('../validations/hotels')
const { upload } = require('../middleware/multer')
router.get('/', getHotels)

router.get('/:id', getHotel)

router.post('/', checkOrigen, upload, validExist, createHotel)

router.put('/:id', checkOrigen, validForm, updateHotel)

// actualizar visualizacion
// router.patch('/:id', updateHotel)

router.delete('/:id', checkOrigen, validExistDelUpd, deleteHotel)


router.get('/filtrado/:parametros', filtrarHoteles)

module.exports = router