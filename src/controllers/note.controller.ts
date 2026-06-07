import { NextFunction, Response } from "express";
import { ResponseUtils } from "../utils/response";
import NoteService from "../services/note.service";
import { NoteSchema } from "../schema/note.schema";
import { NotFoundError } from "../utils/error";
import { Request } from "../middlewares/authorization.middleware";

export class NoteController {
  static async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const note = await NoteService.createNote({
        ...req.body,
        category: req.body.categoryId,
        user: req.uid,
      });
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
      const notes = await NoteService.getAllNotes(req.uid!);
      return res.status(200).json(
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
      const id = NoteSchema.id.parse(req.params.noteId);
      const note = await NoteService.getNote({ id, uid: req.uid! });
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
      const id = NoteSchema.id.parse(req.params.noteId);

      // CHECK IF NOTE EXISTS
      const note = await NoteService.getNote({ id, uid: req.uid! });
      if (!note) {
        throw new NotFoundError("Note not found.");
      }

      await NoteService.deleteNote(id);
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

  static async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const id = NoteSchema.id.parse(req.params.noteId);

      // CHECK IF NOTE EXISTS
      const noteExists = await NoteService.getNote({ id, uid: req.uid! });
      if (!noteExists) {
        throw new NotFoundError("Note not found.");
      }

      const note = await NoteService.updateNote(id, req.body);
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: note,
          message: "Note updated successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }

  static async getNotesByCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryId = NoteSchema.id.parse(req.params.categoryId);
      const notes = await NoteService.getNotesByCategory({ categoryId, uid: req.uid! });
      return res.status(200).json(
        ResponseUtils.successResponse({
          data: notes,
          message: "Notes fetched successfully.",
        }),
      );
    } catch (error) {
      return next(error);
    }
  }
}
