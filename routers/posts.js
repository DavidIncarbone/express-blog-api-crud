// imports

const express = require("express");
const router = express.Router();


//import controller

const { index, show, store, update, modify, destroy } = require("../controllers/piattiController.js")



// **INDEX**


router.get("/", index)

//** Show**

router.get("/:id", show)

//**  Store **
router.post("/", store)


//** Update **
router.put("/:id", update)


//** Modify **
router.patch("/:id", modify)


//** Destroy **
router.delete("/:id", destroy)

module.exports = router;

/*

MVC = Model View Controller

Routing

*/
