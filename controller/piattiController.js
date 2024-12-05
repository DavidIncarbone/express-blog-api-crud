const iMieiPiatti = require("../models/blog.js");
const comments = require("../models/comments.js")

function index(req, res) {

    const nomePiatto = req.query.titolo;
    const tagsPiatto = req.query.tags;
    console.log(nomePiatto);
    let piatti = {

        counter: 5,
        data: [...iMieiPiatti],
    }

    if (nomePiatto) {

        piatti.data = iMieiPiatti.filter((piatto) => piatto.titolo.toLowerCase().includes(nomePiatto.toLowerCase()))
        piatti.counter = piatti.data.length
    }

    if (tagsPiatto) {
        piatti.data = iMieiPiatti.filter((piatto) => piatto.tags.toLowerCase().includes(tagsPiatto.toLowerCase()))
        piatti.counter = piatti.data.length;

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
}

function show(req, res) {

    const id = +(req.params.id);
    const piattoScelto = iMieiPiatti.find((piatto) => piatto.id === id)

    const itemComments = comments.filter((comment) => comment.pizza_is === id)


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

}

function store(req, res) {
    console.log(req.body)


    let newID = 0;
    for (let i = 0; i < iMieiPiatti.length; i++) {

        if (iMieiPiatti[i].id > newID) {
            newID = iMieiPiatti[i].id;

        }
    }
    newID += 1;

    const nuovoPiatto = {
        id: newID,
        titolo: req.body.titolo,
        img: req.body.img,
        tags: req.body.tags
    };

    iMieiPiatti.push(nuovoPiatto);
    res.json(nuovoPiatto)
}

function update(req, res) {

    const id = +(req.params.id)
    const piattoScelto = iMieiPiatti.find((piatto) => piatto.id === id)
    if (!piattoScelto) {
        res.status(404);
        res.json({
            success: false,
            message: "Il piatto non esiste",
        });
        return;
    }
    console.log(req.body);
    piattoScelto.titolo = req.body.titolo;
    piattoScelto.contenuto = req.body.contenuto;
    piattoScelto.img = req.body.img;
    piattoScelto.tags = req.body.tags;

    console.log(piattoScelto);
    res.json(piattoScelto);

}

function modify(req, res) {
    res.send("Modifica parziale del piatto");
}

function destroy(req, res) {

    const id = +(req.params.id);
    const index = iMieiPiatti.findIndex(piatto => piatto.id === id);
    if (index !== -1) {
        iMieiPiatti.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "Piatto non trovato"
        })
    }
    console.log(iMieiPiatti);
}



module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}