function notFound(req, res, next) {
    res.status(404).json({ error: "Not found", message: "Risorsa non trovata" })
};

module.exports = notFound;