import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export const sendMessage = (message, sessionId) =>
    api.post("/chat/message", { message, sessionId }).then((r) => r.data);

export const clearSession = (sessionId) =>
    api.delete(`/chat/session/${sessionId}`).then((r) => r.data);

export const newSession = () =>
    api.get("/chat/session/new").then((r) => r.data);