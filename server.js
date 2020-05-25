// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static('assets'));
app.use(express.static('public'));

// =============================================================
const notes = 
[
    {
      title : "Test title",
      text : "Test test",
      id: 0
    },
    {
      title : "Test title again",
      text : "Test test again",
      id: 1
    }

]


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // or fs.readFile db.json?
  app.get("/api/notes", function(req, res) {
    res.json(notes);
  });
 
  
  app.post("/api/notes", function(req, res) {
    let newId = notes.length;
    let newNote = {title: req.body.title, text: req.body.text, id: newId}

    // or fs.readFile db.json?
    notes.push(newNote);
    res.json(notes);
  });

  app.delete("/api/notes/:id", function(req, res) {
    let deleteId = req.params.id;
    console.log("Deleted ID:" + deleteId);

    let newNotes = [];

    for (i=0; i++; i < notes.length){
      if (i !== deleteId){
        let newNote = {title: notes[i].title, text: notes[i].text, id: newNotes.length-1};
        newNotes.push(newNote)
      }else{
        return
      }
    }

    // or fs.readFile db.json?
    notes = newNotes;
    res.json(notes);
  });

  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });