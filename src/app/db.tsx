import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function connectToDatabase(filename: string) {
  if (fs.existsSync(filename)) {
    return await open({
      filename,
      driver: sqlite3.Database,
    });
  }

  throw new Error("Database not found");
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
