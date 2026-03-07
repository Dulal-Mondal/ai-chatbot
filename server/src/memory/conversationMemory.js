import { BufferMemory } from "langchain/memory";

// In-memory store: sessionId -> BufferMemory
const sessionStore = new Map();

export function getMemory(sessionId) {
    if (!sessionStore.has(sessionId)) {
        sessionStore.set(
            sessionId,
            new BufferMemory({
                returnMessages: true,
                memoryKey: "history",
                inputKey: "input",
                outputKey: "output",
            })
        );
    }
    return sessionStore.get(sessionId);
}

export function clearMemory(sessionId) {
    sessionStore.delete(sessionId);
}

export function getSessionCount() {
    return sessionStore.size;
}