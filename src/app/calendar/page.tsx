import { connectToDatabase } from "../db";
import { Transaction, MonthExpenseData } from "../types";
import TransactionComp from "../transactions";

export default async function Home() {
    const db = await connectToDatabase("./transactions.db");

    const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );
    return(
        <>
            <TransactionComp data={transactions} />
        </>
    )
}