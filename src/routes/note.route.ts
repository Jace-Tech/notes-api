import { Router } from "express";
import { NoteController } from "../controllers/note.controller";

const router = Router();

router.route("/").post(NoteController.createNote).get(NoteController.getAllNotes);

router.route("/:noteId").delete(NoteController.deleteNote).get(NoteController.getNote);

export default router;
