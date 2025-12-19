import { pipeline } from "@xenova/transformers";

let embedder = null;

export async function embedText(text) {
  if (!text || typeof text !== "string") {
    throw new Error(
      `embedText: text may not be null or undefined (received: ${text})`
    );
  }

  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const output = await embedder(text, {
    pooling: "mean",
    normalize: true
  });

  return Array.from(output.data); // 384-dim vector
}
