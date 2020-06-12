import { Schema, model, Document } from "mongoose";

const newSchema = new Schema({
  created_at: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  author: {
    type: String,
  },
  points: {
    type: Number,
  },
  story_text: {
    type: String,
  },
  comment_text: {
    type: String,
  },
  num_comments: {
    type: Number,
  },
  story_id: {
    type: Number,
  },
  story_title: {
    type: String,
  },
  story_url: {
    type: String,
  },
  parent_id: {
    type: Number,
  },
  created_at_i: {
    type: Number,
  },
  _tags: {
    type: Array,
  },
  objectID: {
    type: String,
    unique: true,
  },
  status: {
    type: String,
    default: "ENABLED",
  },
});

interface INew extends Document {
  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: number;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: [];
  objectID: string;
  status: string;
}

export const New = model<INew>("New", newSchema);
