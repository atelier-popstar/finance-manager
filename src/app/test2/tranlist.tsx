'use server'

import { Message } from "postcss";
import { connectToDatabase } from "./db";
import { Transaction } from "../types";

export default async function TransactionList(date: String) {

  const db = await connectToDatabase("./transactions.db");
  console.log(`db obj: ${typeof(db)}`)
  console.log(`translist called with datestring: ${date}`)

  try {
    const transactions: Transaction[] = await db.all(`
    SELECT * FROM transactions WHERE date = '${date}';
    `);

    console.log(`query results: ${transactions}`)
    return transactions
  } catch(e) {
    console.log(`query failed: ${e}`)
  }

 
}

