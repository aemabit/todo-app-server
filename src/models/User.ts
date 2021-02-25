import { Schema, model, Document } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 4
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
      type: String,
      required: true
  }
});

export interface IUserModel extends Document {
    username: string,
    email: string,
    password: string,
}

export default model<IUserModel>("User", UserSchema)