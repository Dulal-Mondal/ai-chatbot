import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getMemory } from "../memory/conversationMemory.js";

const systemPrompt = `You are a helpful, knowledgeable, and friendly AI assistant. 
You provide clear, accurate, and thoughtful responses. 
You remember the context of the conversation and refer back to it when relevant.
If you're unsure about something, you say so honestly.
Keep responses concise but complete.`;

export async function getChatResponse(sessionId, userMessage) {
    const memory = getMemory(sessionId);

    const model = new ChatGroq({
        modelName: process.env.MODEL_NAME || "llama-3.3-70b-versatile",
        temperature: parseFloat(process.env.TEMPERATURE || "0.7"),
        maxTokens: parseInt(process.env.MAX_TOKENS || "1000"),
        apiKey: process.env.GROQ_API_KEY,
    });

    // পুরনো conversation history লোড করুন
    const memoryResult = await memory.loadMemoryVariables({});
    const history = memoryResult.history || [];

    // সব messages একসাথে পাঠান
    const messages = [
        new SystemMessage(systemPrompt),
        ...history,
        new HumanMessage(userMessage),
    ];

    const response = await model.invoke(messages);
    const reply = response.content;

    // Memory তে save করুন
    await memory.saveContext(
        { input: userMessage },
        { output: reply }
    );

    return reply;
}