import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../hooks/useChat";

export default function ChatWindow() {
    const { messages, isLoading, error, send, reset } = useChat();
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    return (
        <div className="chat-container">
            <header className="chat-header">
                <div className="header-left">
                    <div className="logo-dot" />
                    <div>
                        <h1>SoftbrainAi Chat</h1>
                        <span className="status">● Online</span>
                    </div>
                </div>
                <button className="reset-btn" onClick={reset} title="New conversation">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
                    </svg>
                    New Chat
                </button>
            </header>

            <div className="messages-area">
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                    <div className="message-row assistant">
                        <div className="avatar assistant-avatar">AI</div>
                        <div className="bubble assistant-bubble">
                            <TypingIndicator />
                        </div>
                    </div>
                )}
                {error && (
                    <div className="error-toast">⚠️ {error}</div>
                )}
                <div ref={bottomRef} />
            </div>

            <InputBar onSend={send} isLoading={isLoading} />
        </div>
    );
}