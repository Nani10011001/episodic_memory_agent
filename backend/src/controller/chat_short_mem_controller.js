import { Episode } from "../../schema/epsodmic.schema.js";
import { recallEpisodes } from "../../schema/retrive_memory.js";
import { embedText } from "../../utils/emedding.js";
import { runAgent } from "../spawn.js";

export const agent_controller = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // ✅ 1. Validate input
    if (!userId || !prompt) {
      return res.status(400).json({
        success: false,
        message: "userId and prompt are required"
      });
    }

    // ✅ 2. Embed ONCE
    const embedding = await embedText(prompt);

    // ✅ 3. Store STM episode
    const episode = await Episode.create({
      userId,
      summary: prompt,
      episodeType: "stm",
      tags: ["chat", "user-input"],
      embedding
    });

    // ✅ 4. Recall STM (NO re-embedding)
    const recalledEpisodes = await recallEpisodes({
      userId,
      embedding,
      limit: 5
    });

    // ✅ 5. Run Python agent
    const agentResponse = await runAgent({
      prompt,
      memory: recalledEpisodes
    });

    // ✅ 6. Respond
    res.status(200).json({
      success: true,
      episodeStored: episode._id,
      recalledCount: recalledEpisodes.length,
      reply: agentResponse
    });

  } catch (error) {
    console.error("Agent Controller Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
