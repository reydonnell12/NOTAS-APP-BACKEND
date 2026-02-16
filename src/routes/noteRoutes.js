import express from "express";
import Note from "../models/nodeModel.js";
const router = express.Router();

//obating notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(201).json(notes);
  } catch (error) {
    console.log(`an error has ocurred ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//obtaing notes by id
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "note not found" });
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    console.log(`an error has ocurred ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//create new note

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body; // destructuring: we extract the data tah comes from client
    const note = new Note({ title, description });
    const saveNote = await note.save();
    if (saveNote) {
      res.status(201).json({ message: "note created success", note: saveNote });
    }
  } catch (error) {
    console.log(`something happened ${error}`);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete a note

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({ message: "note does not deleted" });
    } else {
      res.status(200).json(deletedNote);
    }
  } catch (error) {
    console.log(`an error has ocurred eleminating note ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit note

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const updateNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { returnDocument: "after" },
    );
    if (!updateNote)
      return res.status(404).json({ error: "note could not updated" });
    res
      .status(200)
      .json({ message: "The note was updated correctly", note: updateNote });
  } catch (error) {
    console.log(`if was not possible to update the note ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
