import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { NoteSchema } from "../schema/note.schema";

const router = Router();

router
  .route("/")
  .post(validateBody(NoteSchema.createNote), NoteController.createNote)
  .get(NoteController.getAllNotes);

router
  .route("/:noteId")
  .get(NoteController.getNote)
  .delete(NoteController.deleteNote)
  .put(validateBody(NoteSchema.updateNote), NoteController.updateNote);

router.get("/categories/:categoryId", NoteController.getNotesByCategory);

export default router;
