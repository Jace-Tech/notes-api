import { model, Schema } from "mongoose";

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

const noteSchema = new Schema<Note>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Note = model<Note>("Note", noteSchema);
export default Note;
