import { Schema, model, Document, Types } from "mongoose";

const ToDoSchema = new Schema({
  task: {
    type: String,
    required: true,
    min: 4
  },
  user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
  },
  complete: {
    type: Boolean,
    default: false
  }
});

export interface IToDo extends Document {
    task: string,
    user: Types.ObjectId | Record<string, unknown>,
    complete: boolean
}

export default model<IToDo>("ToDo", ToDoSchema)