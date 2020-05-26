# Note-Taker

## Deployed App

https://young-cove-23912.herokuapp.com

## Description

This application can be used to write, save, and delete notes, supported by the express backend and a `db.json` file that can save and retrieve note data from the html.


## HTML routes:

  * GET `/notes` - Should return the `notes.html` file.

  * GET `/` - Should return the `index.html` file


## API routes:

  * GET `/api/notes` - reads the `db.json` file and return all saved notes as JSON.

  * POST `/api/notes` - receives a new note to save on the request body, adds it to the `db.json` file, and then returns the new note to the client.

  * DELETE `/api/notes/:id` - receives a query parameter containing the id of a note to delete, and the `db.json` file will be updated accordingly.


## Tiny bug

  * The first note is not rendered properly when clicked for some reason... But all following notes will be rendered as "read only" mode when clicked.

  * The edit function has not been requested from the prompt, therefore it hasn't been created to edit existing notes. To compensate, the user can always delete old notes and create a new one to be saved...


