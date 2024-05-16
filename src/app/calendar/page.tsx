import { connectToDatabase } from "../db";
import { Transaction, MonthExpenseData } from "../types";
import TransactionComp from "../transactions";
import Header from "../header"

export default async function Home() {
    const db = await connectToDatabase("./transactions.db");

    const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );
    return(
        <main className="flex flex-col">
            <Header/>
            <TransactionComp data={transactions} />
        </main>
    )
}