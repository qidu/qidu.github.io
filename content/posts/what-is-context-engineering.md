+++
date = '2025-07-15T14:23:41+08:00'
draft = false
title = 'What Is Context Engineering'
+++

What is the Context?

- `Instructions` / `System Prompt`: An initial set of instructions that define the behavior of the model during a conversation, can/should include examples, rules ….
- `User Prompt`: Immediate task or question from the user.
- `State / History` (short-term Memory): The current conversation, including user and model responses that have led to this moment.
- `Long-Term Memory`: Persistent knowledge base, gathered across many prior conversations, containing learned user preferences, summaries of past projects, or facts it has been told to remember for future use.
- `Retrieved Information (RAG)`: External, up-to-date knowledge, relevant information from documents, databases, or APIs to answer specific questions.
- `Available Tools`: Definitions of all the functions or built-in tools it can call (e.g., check_inventory, send_email).
Structured Output: Definitions on the format of the model's response, e.g. a JSON object.

Why context engineering matters for agent?

> Agents need context to perform tasks. Context engineering is the art and science of filling the context window with just the right information at each step of an agent’s trajectory. 

- Instructions – prompts, memories, few‑shot examples, tool descriptions, etc
- Knowledge – facts, memories, etc
- Tools – feedback from tool calls

Refer to following articles for more:
- [The New Skill in AI is Not Prompting, It's Context Engineering](https://www.philschmid.de/context-engineering)
- [Context Engineering for Agents](https://rlancemartin.github.io/2025/06/23/context_engineering/)
