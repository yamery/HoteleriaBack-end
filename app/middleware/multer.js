const multer = require('multer')
const path = require('path')
const mime = require('mime-types');
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + "." + mime.extension(file.mimetype))
    }
})

const upload = multer({ storage: storage })

exports.upload = upload.single('img');