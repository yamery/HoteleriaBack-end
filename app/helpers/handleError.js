const res = require("express/lib/response")

const httpError = (res, err) => {
    console.log(err)
    res.status(500).json({
        data: "Error WEYYYYYYY",
        error: err
    })
}

module.exports = { httpError }