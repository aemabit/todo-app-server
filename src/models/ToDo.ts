import { Schema, model, Document, Types } from "mongoose";

export interface IToDo extends Document {
  task: string,
  user: Types.ObjectId | Record<string, unknown>,
  complete: boolean
}

const ToDoSchema: Schema = new Schema({
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

export default model<IToDo>("ToDo", ToDoSchema)