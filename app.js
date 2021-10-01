require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const app = express()

const { dbConnect } = require('./config/db')


const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api', require('./app/routes'))
app.use('/uploads', express.static(path.resolve('uploads')));
dbConnect()
app.listen(PORT, () => {
    console.log("Servidor Corriendo", PORT)
})