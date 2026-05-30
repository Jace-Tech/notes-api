import { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "../utils/response";
import NoteService from "../services/note.service";
import { NoteSchema } from "../schema/note.schema";
import { NotFoundError } from "../utils/error";

export class NoteController {
  static async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = NoteSchema.createNote.parse(req.body);
      const note = await NoteService.createNote(validatedBody);
      return res.status(201).json(
        ResponseUtils.successResponse({
          data: note,
          message: "Note created successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getAllNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const notes = await NoteService.getAllNotes();
      return res.status(201).json(
        ResponseUtils.successResponse({
          data: notes,
          message: "Notes fetched successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getNote(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = NoteSchema.id.parse(req.params.noteId);
      const note = await NoteService.getNote(validatedParams);
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: note,
          message: "Note fetched successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async deleteNote(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = NoteSchema.id.parse(req.params.noteId);

      // CHECK IF NOTE EXISTS
      const note = await NoteService.getNote(validatedParams);
      if (!note) {
        throw new NotFoundError("Note not found.");
      }

      await NoteService.deleteNote(validatedParams);
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: note,
          message: "Note deleted successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }
}
