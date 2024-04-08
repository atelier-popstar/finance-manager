const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./transactions.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    console.log("Connected to existing DB")
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error: { message: any; }) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db: { exec: (arg0: string) => void; }) {
  db.exec(`
  CREATE TABLE transactions
  (
    id    VARCHAR(5) PRIMARY KEY NOT NULL,
    amount       VARCHAR(10) NOT NULL,
    category     VARCHAR(10) NOT NULL,
    tag           VARCHAR(50) NOT NULL,
    date        VARCHAR(30) NOT NULL,
  )
`);
  console.log("Created table 'transactions' in Database")
}

module.exports = connectToDatabase();