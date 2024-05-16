'use server'

import { connectToDatabase } from "../db";
import { Transaction } from "../types";

export default async function TransactionList(date:String | void) {
    const db = await connectToDatabase("./transactions.db");

    const transactions: Transaction[] = await db.all(
    `SELECT * FROM transactions WHERE date = ${date}`
  );
    return(
        transactions
    )
}