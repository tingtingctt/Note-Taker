// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

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

// =============================================================
// const notes = 
// [
//     {
//       title : "Test title",
//       text : "Test test",
//       id: 0
//     },
//     {
//       title : "Test title again",
//       text : "Test test again",
//       id: 1
//     }

// ]


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
  
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  
  app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });

  // app.get("/api/notes", function(req, res) {
  //   res.json(notes);
  // });
 
  app.get("/api/notes", function(req, res){
    res.sendFile(__dirname + "/db/db.json")
});

//   app.get("/api/notes", function(req, res){
//     fs.readFile(__dirname + "/db/db.json", function(err, data) {
//     if (err) throw err;
//     console.log(data);
//     res.json(data);
//   });
// });
  
  // app.post("/api/notes", function(req, res) {
  //   let newId = notes.length;
  //   let newNote = {title: req.body.title, text: req.body.text, id: newId}
  //   notes.push(newNote);
  //   res.json(notes);
  // });
 var notes = [];

  readFileAsync(__dirname + "/db/db.json", "utf8", function(err, data) {
    if (err) {
      throw err;
    }

    notes = JSON.parse(data);
  });

  app.post("/api/notes", function(req, res) {
    readFileAsync(__dirname + "/db/db.json", "utf8", function(err, data) {
      if (err) {
        throw err;
      }
      notes = JSON.parse(data);
    });

    let newId = notes.length;
    let newNote = {title: req.body.title, text: req.body.text, id: newId}
    notes.push(newNote);
    writeFileAsync(
      __dirname + "/db/db.json",
      JSON.stringify(notes, null, 2),
      "utf8"
    ).then(res.send(true));
  });

  // async function combineAnimals() {
  //   try {
  //     const hamster = await readFileAsync("hamster.json", "utf8");
  //     const dog = await readFileAsync("dog.json", "utf8");
  //     const cat = await readFileAsync("cat.json", "utf8");
  //     const goldfish = await readFileAsync("goldfish.json", "utf8");
  
  //     const animalJSON = [hamster, dog, cat, goldfish].map(JSON.parse);
  
      // await writeFileAsync(
      //   "combined.json",
      //   JSON.stringify(animalJSON, null, 2),
      //   "utf8"
      // );
  
  //     console.log("Successfully wrote to 'combined.json' file");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  var newNotes = [];

  app.delete("/api/notes/:id", function(req, res) {
    readFileAsync(__dirname + "/db/db.json", "utf8", function(err, data) {
      if (err) {
        throw err;
      }
      notes = JSON.parse(data);
    });

    let deleteId = req.params.id;
    let i=0;
    for (i=0; i++; i < notes.length){
      if (i == deleteId){
        console.log("Deleted ID:" + i);
      }else{
        let newNote = {title: notes[i].title, text: notes[i].text, id: newNotes.length-1};
        newNotes.push(newNote)
      }
    }

    console.log(newNotes);

    writeFileAsync(
      __dirname + "/db/db.json",
      JSON.stringify(newNotes, null, 2),
      "utf8"
    ).then(function(newNotes){
      notes = newNotes;
      res.send(true)});
  });






  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });