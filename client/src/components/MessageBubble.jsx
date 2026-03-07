export default function MessageBubble({ message }) {
    const isUser = message.role === "user";
    const time = new Date(message.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <div className={`message-row ${isUser ? "user" : "assistant"}`}>
            {!isUser && (
                <div className="avatar assistant-avatar">AI</div>
            )}
            <div className={`bubble ${isUser ? "user-bubble" : "assistant-bubble"}`}>
                <p>{message.content}</p>
                <span className="timestamp">{time}</span>
            </div>
            {isUser && (
                <div className="avatar user-avatar">You</div>
            )}
        </div>
    );
}