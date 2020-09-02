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
    const newNote = req.body;
    newNote.id = uniqID("note-");
    console.log(newNote.id);
    dataBase.push(newNote);
    console.log(newNote);
});

// Delete saved notes
app.delete("/api/notes/:id", function (req, res) {
    const id = req.params.id;
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});