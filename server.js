// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const dataBase = require("./db/db.json")

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


// Basic route that sends the user to the index page
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
// API route that reads the db.json file and returns saved notes as JSON
app.get("/api/notes", function (req, res) {
        return res.json(dataBase);
    });

// Create New Notes - takes in JSON input
app.post("/api/notes", function (req, res) {
    var newNote = req.body;
    newNote = JSON.stringify(newNote);
    var dataBase = JSON.parse(dataBase);
    console.log(dataBase);
    console.log(newNote);
    //pushes the new note into the db.json file
    dataBase.push(newNote);
    // writes the new note to file
    fs.writeFile("./Develop/db/db.json", dataBase, "utf8", function (err) {
        // error handling
        if (err) throw err;
    });
    // changes dataBase back to an array of objects & sends it back to the client
    res.json(JSON.parse(dataBase));
});

// Delete saved notes
//ADD CODE HERE

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
