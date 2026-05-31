import { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "../utils/response";
import NoteService from "../services/note.service";
import { NoteSchema } from "../schema/note.schema";
import { NotFoundError } from "../utils/error";
import { INote } from "../models/note.model";

export class NoteController {
  static async createNote(req: Request<{}, {}, INote>, res: Response, next: NextFunction) {
    try {
      const note = await NoteService.createNote(req.body);
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

  static async getAllNotes(_: Request, res: Response, next: NextFunction) {
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

  static async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = NoteSchema.id.parse(req.params.noteId);

      // CHECK IF NOTE EXISTS
      const noteExists = await NoteService.getNote(validatedParams);
      if (!noteExists) {
        throw new NotFoundError("Note not found.");
      }

      const note = await NoteService.updateNote(validatedParams, req.body);
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
      const validatedParams = NoteSchema.id.parse(req.params.categoryId);
      const notes = await NoteService.getNotesByCategory(validatedParams);
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
