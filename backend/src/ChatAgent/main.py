from langgraph.graph import START, StateGraph, END
from langchain_groq import ChatGroq
from dotenv import load_dotenv
from typing import TypedDict, List
import os, json, sys

from langchain_core.messages import (
    AIMessage,
    HumanMessage,
    SystemMessage,
    BaseMessage
)

load_dotenv()

# Agent Stat
class AgentState(TypedDict):
    messages: List[BaseMessage]
    system_prompt: SystemMessage



# LLM

llm = ChatGroq(
    model_name="llama-3.1-8b-instant",
    api_key=os.getenv("GROQ_API_KEY")
)

MAX_MESSAGES = 8


def trim_messages(messages: List[BaseMessage]) -> List[BaseMessage]:
    return messages[-MAX_MESSAGES:]


# System prompt for the llm

def build_chat_system_prompt(memory_text: str) -> SystemMessage:
    return SystemMessage(
        content=f"""
You are a personal AI assistant.

Personal Memory (trusted facts about the user):
{memory_text}

RULES:
- Use Personal Memory ONLY for facts about the user.
- You MAY answer general knowledge questions normally.
- DO NOT invent personal details.
- If a personal fact is missing, say:
  "I don't have that information yet."
"""
    )



# episode prompt

EPISODE_PROMPT = """
You are an episodic memory extractor.

Extract ONLY stable user facts from the USER message.

If the message implies a recurring activity, hobby, or lifestyle,
classify it as an INTEREST.

Examples:
- "I go to the gym 5 days a week" → interest: fitness
- "I love building AI agents" → interest: AI
- "I watch anime every night" → interest: anime

Return JSON ONLY:
{
  "should_store": true/false,
  "summary": "Short factual sentence",
  "episode_type": "profile | habit | interest | goal",
  "tags": ["tag1", "tag2"]
}
"""


def extract_episode(user_text: str):
    response = llm.invoke([
        SystemMessage(
            content=EPISODE_PROMPT + f"\n\nUser: {user_text}"
        )
    ])

    try:
        return json.loads(response.content)
    except Exception:
        return {
            "should_store": False,
            "summary": "",
            "episode_type": "",
            "tags": []
        }



# Chat node agent work

def chat_agent(state: AgentState) -> AgentState:
    state["messages"] = trim_messages(state["messages"])
    full_input = [state["system_prompt"]] + state["messages"]

    response: AIMessage = llm.invoke(full_input)
    state["messages"].append(response)
    state["messages"] = trim_messages(state["messages"])

    return state


# GRAPH

graph = StateGraph(AgentState)
graph.add_node("chat", chat_agent)
graph.add_edge(START, "chat")
graph.add_edge("chat", END)
app = graph.compile()



# MAIN function which take the data from the node to python

def main():
    raw_input = sys.stdin.read()
    data = json.loads(raw_input)

    # MATCH NODE PAYLOAD
    user_input = data["prompt"]
    episodic_memory = data.get("memory", [])

    # Extract summaries only
    memory_text = (
        "\n".join(f"- {m.get('summary', '')}" for m in episodic_memory)
        if episodic_memory
        else "No stored personal information yet."
    )

    system_prompt = build_chat_system_prompt(memory_text)

    try:
        result = app.invoke({
            "messages": [HumanMessage(content=user_input)],
            "system_prompt": system_prompt
        })

        ai_reply = result["messages"][-1].content

        episode = extract_episode(user_input)

        print(json.dumps({
            "reply": ai_reply,
            "episode": episode
        }), flush=True)

    except Exception as e:
        print(json.dumps({
            "error_Ai": str(e)
        }), flush=True)


if __name__ == "__main__":
    main()
