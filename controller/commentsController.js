const comments = require("../models/comments.js");

function index(req, res) {
    const testoCommento = req.query.testo;
    let response = {
        totalCount: comments.length,
        data: [...comments]
    }

    if (testoCommento) {

        response.data = comments.filter((comment) => comment.testo.toLowerCase().includes(testoCommento.toLowerCase()))

    }
    if (response.data.length < 1) {
        res.status(404);
        response = {

            counter: 0,
            error: 404,
            message: "Non ci sono commenti per la tua ricerca",
        }

        res.json(response)
    }
}

function show(req, res) {

    const id = +(req.params.id);
    const CommentoScelto = comments.find((Commento) => Commento.id === id)
    if (CommentoScelto) {
        res.json({
            success: true,
            CommentoScelto,
        });
    } else {
        res.status(404);
        res.json({
            success: false,
            message: "Il commento non esiste",
        });
    }

}

function store(req, res) {



    let newID = 0;
    for (let i = 0; i < comments.length; i++) {

        if (comments[i].id > newID) {
            newID = comments[i].id;

        }
    }
    newID += 1;

    const nuovoCommento = {
        id: newID,
        piatto_id: req.body.piatto_id,
        testo: req.body.testo,

    };
    console.log(nuovoCommento)

    comments.push(nuovoCommento);
    res.json(nuovoCommento)
}

function update(req, res) {

    const id = +(req.params.id)
    const commentoScelto = iMieiPiatti.find((commento) => commento.id === id)
    if (!commentoScelto) {
        res.status(404);
        res.json({
            success: false,
            message: "Il commento non esiste",
        });
        return;
    }
    console.log(req.body);
    commentoScelto.piatto_id = req.body.piatto_id;
    commentoScelto.testo = req.body.testo;


    console.log(commentoScelto);
    res.json(commentoScelto);

}

function modify(req, res) {
    res.send("Modifica parziale del commento");
}

function destroy(req, res) {

    const id = +(req.params.id);
    const index = comments.findIndex(commento => commento.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.sendStatus(204);
    } else {
        res.status(404);
        res.json({
            error: "404",
            message: "commento non trovato"
        })
    }
    console.log(comments);
}



module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}