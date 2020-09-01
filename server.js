// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Basic route that sends the user to the index page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Basic route that sends the user to the notes page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API route that reads the db.json file and returns saved notes as JSON
app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
        if (err) throw err;
        return res.json(data);
    });
});

// Create New Notes - takes in JSON input
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    //pushes the new note into the db.json file
    //(db.json).push(newNote);
    res.json(newNote);
});

// Delete saved notes
//ADD CODE HERE

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  