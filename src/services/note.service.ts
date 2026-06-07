import Note, { INote } from "../models/note.model";

class NoteService {
  async createNote(data: INote) {
    const note = await Note.create(data);
    return note.populate([
      { path: "category", select: "-createdAt -updatedAt" },
      { path: "user", select: "-createdAt -updatedAt -password -__v" },
    ]);
  }

  async getAllNotes(uid: string) {
    const notes = await Note.find({ user: uid }).populate([
      { path: "category", select: "-createdAt -updatedAt" },
      { path: "user", select: "-createdAt -updatedAt -password -__v" },
    ]);
    return notes;
  }

  async getNote({ id, uid }: { id: string; uid: string }) {
    const note = await Note.findOne({ _id: id, user: uid }).populate([
      { path: "category", select: "-createdAt -updatedAt" },
      { path: "user", select: "-createdAt -updatedAt -password -__v" },
    ]);
    return note;
  }

  async deleteNote(id: string) {
    const note = await Note.findByIdAndDelete(id);
    return note;
  }

  async updateNote(id: string, updates: INote) {
    const note = await Note.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    return note?.populate([
      { path: "category", select: "-createdAt -updatedAt" },
      { path: "user", select: "-createdAt -updatedAt -password -__v" },
    ]);
  }

  async getNotesByCategory({ uid, categoryId }: { uid: string; categoryId: string }) {
    const notes = await Note.find({ category: categoryId, user: uid }).populate([
      { path: "category", select: "-createdAt -updatedAt" },
      { path: "user", select: "-createdAt -updatedAt -password -__v" },
    ]);
    return notes;
  }
}

const noteService = new NoteService();
export default noteService;
