// Import Express.js
const express = require("express");
const app = express();

// Import routers

const postsRouter = require("./routers/posts.js");
const commentsRouter = require("./routers/commentsRouter.js");
const errorsHandler = require("./Middlewares/errorsHandler.js");
const notFound = require("./Middlewares/notFound.js");


//parse in JSON

app.use(express.json());


//URL

const url = `http://localhost:${process.env.PORT}` || 3000;

// Public Folder

app.use(express.static("public"))

//Route

app.get("/", (req, res) => {

    res.send("<h1>Server del mio blog</h1>")
})

// Routers system

app.use("/bacheca", postsRouter);
app.use("/comments", commentsRouter)

// Errors 


app.use(errorsHandler);
app.use(notFound);

// Server Listen

app.listen(process.env.PORT, () => {

    console.log(`Server is running on ${url}`);
})







