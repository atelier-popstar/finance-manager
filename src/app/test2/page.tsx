import { AddForm } from "./add-form";
import { DeleteForm } from "./delete-form";

const db = require("./db.tsx");

export default async function Home() {
  // let data = await db.all(`SELECT * FROM transactions;`);
  // console.log(data)
  // const {rows: transactions} = data;
  // console.log(transactions);

  const transactions: { id: number; amount: number; category: string; tag: string; date: string; }[] = [];

  await db.each(
    "SELECT * FROM transactions",
    (error: any, row: any) => {
      if(error){
        throw error;
      }
      transactions.push(
        {
        id: row.id,
        amount:row.amount,
        category: row.category,
        tag: row.tag,
        date: row.date,
        }
      )
    },
    (error: any, numberOfRows: number) => {
      if(error){
        throw error;
      }
      console.log(numberOfRows);
    }
  )

  return (
    <main>
      <h1 className="sr-only">Transactions</h1>
      <AddForm />
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.amount}
            {transaction.category}
            {transaction.tag}
            {transaction.date}
            <DeleteForm id={transaction.id} name={transaction.tag} />
          </li>
        ))}
      </ul>
    </main>
  );
}