import { AddForm } from "./add-form";
import TransactionComp from "./transactions";
import { connectToDatabase } from "./db";
import { Transaction } from "./types";

export default async function Home() {

  const db = await connectToDatabase("./transactions.db");

  const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );

  return (
    <main>
      <h1 className="sr-only">Transactions</h1>
      <AddForm />
      <TransactionComp data={transactions} />
    </main>
  );
}