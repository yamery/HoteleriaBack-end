const checkOrigen = (req, res, next) => {
    //saber que venga de un origen
    console.log(req.headers)
    const url = req.headers.origin;
    next()
}

module.exports = checkOrigen;