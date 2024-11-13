import db from "../lib/db";

async function initializeDatabase() {
  try {
    // Create bets table if it doesn't exist
    await db.query(`
      CREATE TABLE IF NOT EXISTS bets (
        id TEXT PRIMARY KEY,
        candidate TEXT NOT NULL,
        candidate_image TEXT NOT NULL,
        type TEXT CHECK(type IN ('yes', 'no')) NOT NULL,
        amount REAL NOT NULL,
        initial_odds REAL NOT NULL,
        current_odds REAL NOT NULL,
        date TEXT NOT NULL,
        value REAL NOT NULL,
        status TEXT CHECK(status IN ('open', 'closed')) NOT NULL
      )
    `);

    // Insert dummy data
    const dummyBets = [
      {
        id: "1",
        candidate: "Candidate A",
        candidate_image: "/placeholder.svg?height=100&width=100",
        type: "yes",
        amount: 100,
        initial_odds: 96.1,
        current_odds: 97.5,
        date: "2023-05-01",
        value: 101.46,
        status: "open",
      },
      {
        id: "2",
        candidate: "Other",
        candidate_image: "/placeholder.svg?height=100&width=100",
        type: "no",
        amount: 50,
        initial_odds: 96.5,
        current_odds: 95.8,
        date: "2023-05-02",
        value: 50.36,
        status: "closed",
      },
      {
        id: "3",
        candidate: "Candidate B",
        candidate_image: "/placeholder.svg?height=100&width=100",
        type: "yes",
        amount: 75,
        initial_odds: 45.0,
        current_odds: 48.2,
        date: "2023-05-03",
        value: 80.33,
        status: "open",
      },
    ];

    // Insert each bet
    for (const bet of dummyBets) {
      await db.query(
        `INSERT OR REPLACE INTO bets (
          id, candidate, candidate_image, type, amount, 
          initial_odds, current_odds, date, value, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          bet.id,
          bet.candidate,
          bet.candidate_image,
          bet.type,
          bet.amount,
          bet.initial_odds,
          bet.current_odds,
          bet.date,
          bet.value,
          bet.status,
        ]
      );
    }

    console.log("Database initialized successfully with dummy data");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("Database initialization completed");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
