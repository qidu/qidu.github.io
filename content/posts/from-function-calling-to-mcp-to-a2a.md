+++
date = '2025-05-23T12:10:44+08:00'
draft = true
title = 'From Function Calling to MCP, to A2A'
+++

![Agentic Application uses A2A to communicate, uses MCP for tools calling](https://google.github.io/A2A/assets/a2a-mcp.png "A2A and MCP")
> [A2A and MCP](https://google.github.io/A2A/topics/a2a-and-mcp)
> * An A2A Server (a remote agent) could also expose some of its skills as MCP-compatible resources, especially if those skills are well-defined and can be invoked in a more tool-like.
> * Other agent might "discover" this A2A agent's specific skill via an MCP-style tool description (from its Agent Card).
> * A2A is about agents partnering on tasks, while MCP is more about agents using capabilities.
> * A2A for inter-agent collaboration and MCP for tool integration.
> * A2A facilitates the higher-level, conversational, and task-oriented interactions between partners.
> * MCP enables some agents to use specific, structured tools to perform specific functions.

![A2A and MCP: Complementary Protocols](https://google.github.io/A2A/assets/a2a-mcp-readme.png)
> An agent interacts with:
> * Tools & Resources: typically primitives with well-defined, structured inputs and outputs, perform specific, often stateless, functions.
> * Agents: Autonomous systems. They can reason, plan, use multiple tools, maintain state over longer interactions, and engage in complex, often multi-turn dialogues to achieve novel or evolving tasks. Then are less predictable than a simple tool.

[Function Calling](https://platform.openai.com/docs/guides/function-calling)
> Each Agent or Program should define every functions specificly again and again:
> 1. User defines Tools(Functions) in local codes.
> 2. User send function definitions to LLM by system prompts or specific fields of LLM API. 
> 3. LLM tells user what tool to call next.
> 4. User then calls the function in local codes.
> 5. User sends function return value to LLM to get more readable responses.
![Function Calling](https://cdn.openai.com/API/docs/images/function-calling-diagram-steps.png)

[MCP Introduction](https://modelcontextprotocol.io/introduction)
![MCP](https://github.com/modelcontextprotocol/.github/blob/main/profile/assets/light.png)
> Define Tools ( MCP Servers) just once, Calling it anywhere by any users selected LLMs repeatly:
> - MCP Hosts: Programs like Claude Desktop, IDEs, or AI tools that want to access data through MCP tools.
> - MCP Clients: Protocol clients that maintain 1:1 connections with servers to retrive each tool context.
> - MCP Servers: Lightweight programs that each expose specific tools(functions) definitions and capabilities as standardized Model Context Protocol. They may run locally, or run in Cloud exposing with HTTP/SSE or Streamable HTTP. [Find servers](https://github.com/modelcontextprotocol/servers)
> - Local Data Sources: Your computer’s files, databases, and services that MCP servers can access locally.
> - Remote Services: Cloud Services (e.g., PaaS, SaaS and other services APIs) that MCP servers can connect to.

> How to pass tools context to LLMs?
> - Through system prompts or specific fields of LLM API.

> How to pass too many tools context to LLMs?
> - May use RAG and vector db to retrive some relative tools contexts (NOT all tools), and pass to LLM each time.
