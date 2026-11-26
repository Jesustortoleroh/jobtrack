import { closeDatabase } from "./database/index.ts";
import app from "./app.ts";

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("\nShutting down gracefully...");
    server.close(async () => {
        await closeDatabase();
        process.exit(0);
    });
});