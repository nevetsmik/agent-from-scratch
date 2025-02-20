/*
* Context window (i.e., memory)
Messages sent to the LLM and received from the LLM must be saved and provided to the LLM in each prompt to provide the LLM with proper context. LLMs
have a memory limit where the amount of tokens (i.e., the amount of text) that can be stored is finite. Different strategies can be used to manage the amount of tokens
stored in the context window. For example,
1) the oldest messages can be discarded when the context window is full like an LRU cache,
2) RAG,
3) messages sent and received can be summarized by the LLM as a means to reduce the amount of tokens stored in the context window.

* Tokens
A token is a unit of text that is used by the LLM. Tokens are sent to the LLM and received from the LLM. Tokens are used to determine how much text can be stored in the context window.
Tokens are used to determine the cost of the LLM call.

* Role types
System - sets LLM behavior
User
Assistant
Tool - a function specified by the dev to be used by the LLM. Use the LLM to determine whether the function should be called. Order of prompts matters: the LLM will complain if it
determines that a function call should be made but the function is not called. For example,
// An LLM Response with Function Call
{
  role: 'assistant',
  content: null,
  tool_calls: [{
    id: 'call_abc123',
    type: 'function',
    function: {
      name: 'get_weather',
      arguments: '{"location":"London"}'
    }
  }]
}

// Function Execution Result where the role is 'tool' and the tool_call_id is the id of the tool call in the LLM response
{
  role: 'tool',
  content: '{"temperature": 18, "condition": "cloudy"}',
  tool_call_id: 'call_abc123'
}
*/

/*
* An AI agent is an LLM enhanced with:
Ability to make decisions
Capability to use tools via function calling
Memory of past interactions
Ability to operate in loops until task completion
Self-monitoring and correction capabilities

* Key Characteristics
Autonomous decision making
Task persistence
Tool usage
Context awareness
Goal-oriented behavior

*/
import 'dotenv/config';
import { runAgent } from './src/agent';
import { tools } from './src/tools';

const userMessage = process.argv[2];

if (!userMessage) {
    console.error('Please provide a message');
    process.exit(1);
}

const response = await runAgent({ userMessage, tools });
