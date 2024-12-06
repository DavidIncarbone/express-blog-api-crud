function errorsHandler(err, req, res, next) {

    console.log(err.statusCode);
    res.status(500).json({ error: err.message })
}

module.exports = errorsHandler;