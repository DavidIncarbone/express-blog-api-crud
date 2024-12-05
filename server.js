// Server asset
const express = require("express");
const app = express()


//parse in JSON

app.use(express.json())

//URL

const url = `http://localhost:${process.env.PORT}`;

// Public Folder

app.use(express.static("public"))


// Import routers

const postsRouter = require("./routers/posts.js");
const commentsRouter = require("./routers/commentsRouter.js")

//Route

app.get("/", (req, res) => {
    res.send("<h1>Server del mio blog</h1>")
})

// Routers system

app.use("/bacheca", postsRouter);
app.use("/comments", commentsRouter)

// Fallback


app.all("*", (req, res) => {
    res.status(404).send("<h1> Not Found !</h1>")

})

// Server Listen

app.listen(process.env.PORT, () => {

    console.log(`Server is running on ${url}`);
})







