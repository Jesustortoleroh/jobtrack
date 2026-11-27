import { initializeDatabase, getDatabase, closeDatabase } from "./index.ts";

async function initCollections() {
  try {
    // Initialize connection using the existing logic in index.ts
    await initializeDatabase();
    const db = getDatabase();

    console.log("Creating application-specific collections and indexes...");

    // --- APPLICATIONS ---
    await db.createCollection("applications", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "company", "jobTitle", "status", "priority", "createdAt", "updatedAt"],
          properties: {
            // Note: Better-Auth uses string IDs for users, not ObjectIds
            userId: { bsonType: "string" }, 
            company: { bsonType: "string", maxLength: 150 },
            jobTitle: { bsonType: "string", maxLength: 150 },
            status: { enum: ["wishlist", "applied", "interviewing", "offer", "closed"] },
            priority: { enum: ["low", "medium", "high"] },
            createdAt: { bsonType: "date" },
            updatedAt: { bsonType: "date" }
          }
        }
      }
    }).catch(err => { if (err.codeName !== 'NamespaceExists') throw err; });
    
    await db.collection("applications").createIndex({ userId: 1, status: 1, updatedAt: -1 });
    await db.collection("applications").createIndex({ userId: 1, nextActionAt: 1 });
    await db.collection("applications").createIndex({ userId: 1, company: 1, jobTitle: 1 });
    console.log("Applications collection and indexes created.");

    // --- RESUMES ---
    await db.createCollection("resumes").catch(err => { if (err.codeName !== 'NamespaceExists') throw err; });
    await db.collection("resumes").createIndex({ userId: 1, name: 1, version: 1 }, { unique: true });
    console.log("Resumes collection and indexes created.");

    // --- CONTACTS ---
    await db.createCollection("contacts").catch(err => { if (err.codeName !== 'NamespaceExists') throw err; });
    console.log("Contacts collection created.");

    // --- EVENTS ---
    await db.createCollection("events").catch(err => { if (err.codeName !== 'NamespaceExists') throw err; });
    await db.collection("events").createIndex({ userId: 1, startsAt: 1 });
    console.log("Events collection and indexes created.");

    // --- NOTES ---
    await db.createCollection("notes").catch(err => { if (err.codeName !== 'NamespaceExists') throw err; });
    await db.collection("notes").createIndex({ applicationId: 1, createdAt: 1 });
    console.log("Notes collection and indexes created.");

    console.log("All application collections and indexes successfully initialized!");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    // Close the database connection gracefully
    await closeDatabase();
  }
}

initCollections();