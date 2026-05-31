import Note, { INote } from "../models/note.model";

class NoteService {
  async createNote(data: INote) {
    const note = await Note.create(data);
    return note.populate("category");
  }

  async getAllNotes() {
    const notes = await Note.find().populate("category");
    return notes;
  }

  async getNote(id: string) {
    const note = await Note.findById(id).populate("category");
    return note;
  }

  async deleteNote(id: string) {
    const note = await Note.findByIdAndDelete(id);
    return note;
  }

  async updateNote(id: string, updates: INote) {
    const note = await Note.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    return note?.populate("category");
  }

  async getNotesByCategory(categoryId: string) {
    const notes = await Note.find({ category: categoryId }).populate("category");
    return notes;
  }
}

const noteService = new NoteService();
export default noteService;
