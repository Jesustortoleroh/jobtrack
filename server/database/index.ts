import { Db, MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI || "";
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
let db: Db | null = null;

// Initialize database connection with proper error handling
export async function initializeDatabase(): Promise<Db> {
    try {
        await client.connect();
        db = client.db(process.env.DATABASE_NAME || "better-auth");
        console.log("Database connection established");
        return db;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Failed to connect to database:", message);
        process.exit(1);
    }
}

// Get the database instance (assumes initializeDatabase has been called)
export function getDatabase(): Db {
    if (!db) {
        throw new Error(
            "Database not initialized. Call initializeDatabase() first."
        );
    }
    return db;
}

// Graceful shutdown
export async function closeDatabase(): Promise<void> {
    if (client) {
        await client.close();
        console.log("Database connection closed");
    }
}
