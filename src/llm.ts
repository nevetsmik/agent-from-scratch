import { zodFunction } from 'openai/helpers/zod.mjs';
import type { AIMessage } from '../types';
import { openai } from './ai';
import { systemPrompt } from './systemPrompt';

export const runLLM = async ({ messages, tools }: { messages: AIMessage[]; tools: any[] }) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }, ...messages],
        temperature: 0.1,
        tools: tools.map(zodFunction),
        tool_choice: 'auto',
        parallel_tool_calls: false
    });

    return response.choices[0].message;
};
