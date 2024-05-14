import { AddForm } from "./add-form";
import { connectToDatabase } from "./db";
import { Transaction, MonthExpenseData } from "./types";
import { parseByMonth } from "./expense-visualizer";
import TransactionGraph from "./transaction-graph";
import TransactionComp from "./transactions";

export default async function Home() {

  const db = await connectToDatabase("./transactions.db");

  const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );

  const graphData: MonthExpenseData[] = await parseByMonth(transactions)

  return (
    <main>
      <TransactionGraph data={graphData} />
      <h1>Transactions</h1>
      <AddForm />
      <TransactionComp data={transactions} />
    </main>
  );
}