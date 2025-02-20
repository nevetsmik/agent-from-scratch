import { addMessages, getMessages, saveToolResponse } from './memory';
import { runLLM } from './llm';
import { runTool } from './toolRunner';
import { showLoader, logMessage } from './ui';

export const runAgent = async ({ userMessage, tools }: { userMessage: string; tools: any[] }) => {
    await addMessages([{ role: 'user', content: userMessage }]);

    const loader = showLoader('🤔');

    while (true) {
        const history = await getMessages();
        let response = await runLLM({ messages: history, tools });

        await addMessages([response]);

        if (response.content) {
            loader.stop();
            logMessage(response);
            return getMessages();
        }

        if (response && response.tool_calls) {
            const toolCall = response.tool_calls[0];

            logMessage(response);

            loader.update(`executing: ${toolCall.function.name}`);

            const toolResponse = await runTool(toolCall, userMessage);
            await saveToolResponse(toolCall.id, toolResponse);
            loader.update(`done: ${toolCall.function.name}`);
        }
    }
};
