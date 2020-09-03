// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const dataBase = require("./db/db.json");
const uniqID = require("uniqid");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// function readNote() {
//     const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "db/db.json"), "utf8")) || [];
//     console.log(notes);
//     return notes;
// }

// function writeNote(notes) {
//     fs.writeFileSync(path.join(__dirname, "db/db.json"), JSON.stringify(notes));
// }

// Basic route that sends the user to the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// API route that reads the db.json file and returns saved notes as JSON
app.get("/api/notes", function (req, res) {
    return res.json(dataBase);
});

// Basic route that sends the user to the index page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    //Grabs user input and sets into variable
    const newNote = req.body;
    //sets random id using uniqID to key of ID
    newNote.id = uniqID("note-");
    console.log(newNote.id);
    //pushes the new note into the db.json
    dataBase.push(newNote);
    console.log(newNote);
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function (err) {
        if (err) throw err;
        res.json([dataBase]);
    });
});

// Delete saved notes
app.delete("/api/notes/:id", function (req, res) {
    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", function (err, data) {
        if (err) throw err;
        let newDataBase = JSON.parse([data]);
        console.log(newDataBase);
        newDataBase = newDataBase.filter(function (notes) {
            return notes.id !== req.params.id;
        });
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify([...newDataBase]), "utf8", function (err) {
            if (err) throw err;
            res.json([dataBase]);
        })
    });
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});