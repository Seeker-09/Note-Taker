const router = require("express").Router();
const notes = require("../../db/db.json");
const fs = require("fs");

router.get("/notes", (req, res) => {
    res.json(notes);
})

router.post("/notes", (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text
    }

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            const parsedNotes = JSON.parse(data);

            parsedNotes.push(newNote);
    
            fs.writeFile("./db/db.json", JSON.stringify(parsedNotes, null, 4),
                (writeErr) => 
                    writeErr
                    ? console.error(writeErr)
                : console.info("Success")
            )
        }
    })

    const response = {
        status: "success",
        body: newNote
    }

    console.log(response);
    res.json(response);
})

module.exports = router;