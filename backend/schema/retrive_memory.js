import { Episode } from "./epsodmic.schema.js";
import { embedText } from "../utils/emedding.js";



export const recallEpisodes = async ({ userId, embedding, limit = 5 }) => {
  if (!embedding || !Array.isArray(embedding)) {
    throw new Error("recallEpisodes: embedding is required");
  }

  return Episode.find({ userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
};
