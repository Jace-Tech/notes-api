import { Router } from "express";
import { NoteController } from "../controllers/note.controller";
import * as Middlewares from "../middlewares";
import { NoteSchema } from "../schema/note.schema";

const router = Router();

router
  .route("/")
  .post(
    Middlewares.authorizationMiddleware,
    Middlewares.validateBody(NoteSchema.createNote),
    NoteController.createNote,
  )
  .get(Middlewares.authorizationMiddleware, NoteController.getAllNotes);

router
  .route("/:noteId")
  .get(Middlewares.authorizationMiddleware, NoteController.getNote)
  .delete(Middlewares.authorizationMiddleware, NoteController.deleteNote)
  .put(
    Middlewares.authorizationMiddleware,
    Middlewares.validateBody(NoteSchema.updateNote),
    NoteController.updateNote,
  );

router.get(
  "/categories/:categoryId",
  Middlewares.authorizationMiddleware,
  NoteController.getNotesByCategory,
);

export default router;
