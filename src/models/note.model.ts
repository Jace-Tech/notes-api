import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export interface INote extends InferSchemaType<typeof noteSchema> {}

const Note = model<INote>("Note", noteSchema);
export default Note;
