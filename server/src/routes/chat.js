import express from "express";
import { v4 as uuidv4 } from "uuid";
import { getChatResponse } from "../chains/chatChain.js";
import { clearMemory } from "../memory/conversationMemory.js";

const router = express.Router();

// POST /api/chat/message
router.post("/message", async (req, res, next) => {
    try {
        const { message, sessionId } = req.body;

        if (!message || typeof message !== "string" || message.trim() === "") {
            return res.status(400).json({ error: "Message is required." });
        }

        const sid = sessionId || uuidv4();
        const reply = await getChatResponse(sid, message.trim());

        res.json({
            sessionId: sid,
            message: reply,
            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        next(err);
    }
});

// DELETE /api/chat/session/:sessionId
router.delete("/session/:sessionId", (req, res) => {
    clearMemory(req.params.sessionId);
    res.json({ success: true, message: "Session cleared." });
});

// GET /api/chat/session/new
router.get("/session/new", (req, res) => {
    res.json({ sessionId: uuidv4() });
});

export default router;