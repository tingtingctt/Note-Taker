// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


// Sets up the Express App
// =============================================================
const app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static('assets'));
app.use(express.static('public'));
app.use(express.static('db'));


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });


// AJAX Calls
// =============================================================

var notes = [];

//  send json file with all saved notes
app.get("/api/notes", function(req, res){
  res.sendFile(__dirname + "/db/db.json")
});


// save the new note to json file
app.post("/api/notes", function(req, res) {
  // setting existing notes to "notes" array
  readFileAsync(__dirname + "/db/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    notes = JSON.parse(data);
  });

  // saving the new note to the "notes" array with a new "id" attribute
  let newId = notes.length;
  let newNote = {title: req.body.title, text: req.body.text, id: newId}
  notes.push(newNote);

  // updating the json file with the new "notes" array
  writeFileAsync(
    __dirname + "/db/db.json",
    JSON.stringify(notes, null, 2),
    "utf8"
  ).then(res.send(true));
});


// delete a note from the json file
app.delete("/api/notes/:id", function(req, res) {
   // setting existing notes to "notes" array
  readFileAsync(__dirname + "/db/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }
    notes = JSON.parse(data);

    // deleting the note item with matching "id" attribute from the "notes" array 
    var newNotes = [];
    let deleteId = req.params.id;
    for (i=0; i < notes.length;  i++){
      if (i == deleteId){
        console.log("Deleted ID:" + i);
      }else{
        // setting a new order of "id" attributes to the note items of the "newNotes" array
        let newNote = {title: notes[i].title, text: notes[i].text, id: newNotes.length-1};
        newNotes.push(newNote)
      }
    }

    // updating the json file and the "notes" array with the "newNotes" array
    writeFileAsync(
      __dirname + "/db/db.json",
      JSON.stringify(newNotes, null, 2),
      "utf8"
    ).then(function(){
      notes = newNotes;
      res.send(true)});
  });

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});