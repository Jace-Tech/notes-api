import Note from "../models/note";

class NoteService {
  async createNote(data: { title: string; content: string }) {
    const note = await Note.create(data);
    return note;
  }

  async getAllNotes() {
    const notes = await Note.find();
    return notes;
  }

  async getNote(id: string) {
    const note = await Note.findById(id);
    return note;
  }

  async deleteNote(id: string) {
    const note = await Note.findByIdAndDelete(id);
    return note;
  }
}

const noteService = new NoteService();
export default noteService;
