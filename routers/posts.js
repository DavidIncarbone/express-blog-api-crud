// imports

const express = require("express");
const router = express.Router();
const iMieiPiatti = require("../data/blog");


// **INDEX**


router.get("/", (req, res) => {

    const nomePiatto = req.query.titolo;
    console.log(nomePiatto);
    let piatti = {

        counter: 5,
        data: [...iMieiPiatti],
    }

    if (nomePiatto) {

        piatti.data = iMieiPiatti.filter((piatto) => piatto.titolo.toLowerCase().includes(nomePiatto.toLowerCase()))
        piatti.counter = piatti.data.length
    }
    if (piatti.data.length < 1) {
        res.status(404);
        piatti = {

            counter: 0,
            error: 404,
            message: "Non ci sono piatti per la tua ricerca",
        }

    }
    res.json(piatti)
})

//** Show**


router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const piattoScelto = iMieiPiatti.find((piatto) => piatto.id === id)


    if (piattoScelto) {
        res.json({
            success: true,
            piattoScelto,
        });
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il piatto non esiste",
        });
    }

})

//**  Store **
router.post("/", (req, res) => {
    res.send("Creazione nuovo piatto");
});



//** Update **
router.put("/:id", (req, res) => {
    res.send("Modifica totale del piatto");
});


//** Modify **
router.patch("/:id", (req, res) => {
    res.send("Modifica parziale del piatto");
});



//** Destroy **
router.delete("/:id", (req, res) => {
    res.send("Eliminazione del piatto");
});

module.exports = router;