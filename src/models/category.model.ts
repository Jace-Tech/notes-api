import { InferSchemaType, model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export interface ICategory extends InferSchemaType<typeof categorySchema> {}

const Category = model<ICategory>("Category", categorySchema);
export default Category;
