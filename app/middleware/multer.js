const multer = require('multer')
const path = require('path')
const {
    v1: uuidv1,
    v4: uuidv4,
} = require('uuid');
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

exports.upload = upload.single('img');