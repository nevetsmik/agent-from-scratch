import type OpenAI from 'openai';
import { reddit, redditToolDefinition } from './tools/reddit';
import { dadJoke, dadJokeToolDefinition } from './tools/dadJoke';
import { generateImage, generateImageToolDefinition } from './tools/generateImage';

export const runTool = async (toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall, userMessage: string) => {
    const input = {
        userMessage,
        toolArgs: JSON.parse(toolCall.function.arguments || '{}')
    };

    switch (toolCall.function.name) {
        case generateImageToolDefinition.name:
            const image = await generateImage(input);
            return image;

        case dadJokeToolDefinition.name:
            return dadJoke(input);

        case redditToolDefinition.name:
            return reddit(input);

        default:
            throw new Error(`Unknown tool: ${toolCall.function.name}`);
    }
};
