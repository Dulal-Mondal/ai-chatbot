export function errorHandler(err, req, res, next) {
    console.error("❌ Error:", err.message);

    if (err.message?.includes("API key")) {
        return res.status(401).json({ error: "Invalid or missing API key." });
    }

    if (err.message?.includes("rate limit")) {
        return res.status(429).json({ error: "Rate limit exceeded. Please wait." });
    }

    res.status(500).json({
        error: "An internal error occurred.",
        details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
}