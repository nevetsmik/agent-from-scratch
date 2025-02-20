import OpenAI from 'openai';

export type AIMessage =
    | OpenAI.Chat.Completions.ChatCompletionAssistantMessageParam
    | { role: 'user'; content: string }
    | { role: 'tool'; content: string; tool_call_id: string };

export interface ToolFn<A = any, T = string> {
    (input: { toolArgs: A; userMessage: T }): Promise<T>;
}
