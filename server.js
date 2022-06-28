const express = require("express");
const notes = require("./db/db.json");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const { fstat } = require("fs");

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const parsedData = JSON.parse(data);
        res.json(parsedData);
    })
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
})