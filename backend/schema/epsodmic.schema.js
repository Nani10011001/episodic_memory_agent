// models/episode.model.js
import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },

    summary: { type: String, required: true },

    episodeType: {
      type: String,
      default: "general"
    },

    tags: [String],

    embedding: {
      type: [Number], // VECTOR
      required: true
    },

    importance: {
      type: Number,
      default: 0.7
    }
  },
  { timestamps: true }
);

export const Episode = mongoose.model("Episode", episodeSchema,"episodes_vector");
