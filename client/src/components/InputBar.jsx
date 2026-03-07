import { useState } from "react";

export default function InputBar({ onSend, isLoading }) {
    const [text, setText] = useState("");

    const handleSubmit = () => {
        if (text.trim() && !isLoading) {
            onSend(text.trim());
            setText("");
        }
    };

    const handleKey = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="input-bar">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type your message… (Enter to send)"
                rows={1}
                disabled={isLoading}
            />
            <button onClick={handleSubmit} disabled={isLoading || !text.trim()} className="send-btn">
                {isLoading ? (
                    <span className="spinner" />
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                )}
            </button>
        </div>
    );
}