const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



//Route:1 Get all the notes using :GET "api/auth/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {

        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).send("some Error Occured");
    }
})


//Route:2 Add a new note using :POST "api/auth/addnote"
router.post('/addnote', fetchuser, [
    body('title', "Enter a valid title").notEmpty(),
    body('description', 'Enter at least 5 character').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        //checking validation if email is not
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).send({ errors: result.array() });
        }

        //creating a new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);

    } catch (error) {
        res.status(500).send("some Error Occured");
    }
})

//Route:3 update an existing note using :PUT "api/auth/updatenote"
router.put('/updatenote/:id', fetchuser, [
    body('title', "Enter a valid title").notEmpty(),
    body('description', 'Enter at least 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Create a new note object 
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //Find the note to be updated
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        res.status(500).send("some Error Occured");
    }

})

//Route:4 Delete an existing note using :DELETE "api/auth/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        //Find the note to be delete
        let note = await Notes.findById(req.params.id);
        if (!note) { res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note had successfully deleted" });
    } catch (error) {
        res.status(500).send("some Error Occured");
    }

})

module.exports = router;