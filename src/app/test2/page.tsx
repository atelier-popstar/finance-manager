import { AddForm } from "./add-form";
import { DeleteForm } from "./delete-form";
import TransactionComp from "./transactions";
import { connectToDatabase } from "./db";
import { Transaction } from "./types";

// async function getData() {
//   return new Promise((resolve) => {
//     let transactions: Transaction[] = [];

//     db.each(
//       "SELECT * FROM transactions",
//       (error: any, row: any) => {
//         if (error) {
//           console.log(`does this trigger??`)
//           throw error;
//         }
        //  let obj = {
        //    id: row.id,
        //    amount: row.amount,
        //    category: row.category,
        //    tag: row.tag,
        //    date: row.date,
        //  };
        //  console.log(`obj: ${obj.tag}`)

//         transactions[transactions.length] = obj;
//         console.log(`transaction with tag ${transactions[0].tag} added to transactions`)
//       },
//       (error: any, numberOfRows: number) => {
//         if (error) {
//           console.log(`does this trigger?? pt2`)
//           throw error;
//         }
//         console.log(`processed ${numberOfRows} transaction(s)`);
//         console.log(`test if data is fetched correctly within getData: ${transactions[0]}`)
//         resolve(transactions);
//       }
//     )
    
//     console.log(`test if data is fetched correctly within getData: ${transactions[0]}`)
//     resolve(transactions);
//   });

// }


export default async function Home() {
  // let data = await db.all(`SELECT * FROM transactions;`);
  // console.log(data)
  // const {rows: transactions} = data;
  // console.log(transactions);

  const db = await connectToDatabase("./transactions.db");
  const transactions: Transaction[] = await db.all(
    "SELECT * FROM transactions"
  );

  return (
    <main>
      <h1 className="sr-only">Transactions</h1>
      <AddForm />
      <TransactionComp data={transactions} />
      {/* <ul>
        {transactions.map((transaction: Transaction) => (
          <li key={transaction.id}>
            {transaction.amount}
            {transaction.category}
            {transaction.tag}
            {transaction.date}
            <DeleteForm id={transaction.id} name={transaction.tag} />
          </li>
        ))}
      </ul> */}
    </main>
  );
}