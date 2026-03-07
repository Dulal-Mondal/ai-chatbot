import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { sendMessage, clearSession } from "../services/api";

export function useChat() {
    const [messages, setMessages] = useState([
        {
            id: uuidv4(),
            role: "assistant",
            content: "Hello! I'm your AI assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const sessionIdRef = useRef(uuidv4());

    const send = useCallback(async (text) => {
        if (!text.trim() || isLoading) return;

        const userMsg = {
            id: uuidv4(),
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);
        setError(null);

        try {
            const data = await sendMessage(text, sessionIdRef.current);
            sessionIdRef.current = data.sessionId;

            const botMsg = {
                id: uuidv4(),
                role: "assistant",
                content: data.message,
                timestamp: new Date(data.timestamp),
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }, [isLoading]);

    const reset = useCallback(async () => {
        await clearSession(sessionIdRef.current).catch(() => { });
        sessionIdRef.current = uuidv4();
        setMessages([
            {
                id: uuidv4(),
                role: "assistant",
                content: "Hello! I'm your AI assistant. How can I help you today?",
                timestamp: new Date(),
            },
        ]);
        setError(null);
    }, []);

    return { messages, isLoading, error, send, reset };
}