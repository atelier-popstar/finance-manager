import { connectToDatabase } from "./db";
import { Transaction, MonthExpenseData } from "./types";
import { parseByMonth } from "./expense-visualizer";
import TransactionGraph from "./transaction-graph";
import Header from "./header"

export default async function Home() {

  const db = await connectToDatabase("./transactions.db");

  const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );

  const graphData: MonthExpenseData[] = await parseByMonth(transactions)

  return (
    <main className="flex flex-col ">
      <Header/>
      <TransactionGraph data={graphData} />
      
      
      
    </main>
  );
}
