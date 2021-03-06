// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
let dataBase = require("./db/db.json");
const uniqID = require("uniqid");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Basic route that sends the user to the notes page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});


// API route that reads the db.json file and returns saved notes as JSON
app.get("/api/notes", (req, res) => res.json(dataBase));

// Basic route that sends the user to the index page
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

// Create New Notes - takes in JSON input
app.post("/api/notes", (req, res) => {
    //Grabs user input and sets into variable
    const newNote = req.body;
    //sets random id using uniqID to key of ID
    newNote.id = uniqID("note-");
    console.log(newNote.id);
    //pushes the new note into the db.json
    dataBase.push(newNote);
    //writes new item to database
    fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), function (err) {
        if (err) throw err;
        res.json([dataBase]);
    });
});

// Delete saved notes
app.delete("/api/notes/:id", (req, res) => {
        dataBase = dataBase.filter(val => val.id !== req.params.id);
        //writes out item from database
        fs.writeFile(path.join(__dirname, "./db/db.json"), JSON.stringify(dataBase), "utf8", function (err) {
            if (err) throw err;
            res.json(dataBase);
        }) 
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});