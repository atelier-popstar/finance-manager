import { Database } from "sqlite3";
import { AddForm } from "./add-form";
import { DeleteForm } from "./delete-form";
import dynamic from 'next/dynamic';

const TransactionComp = dynamic(()=>import('./transactions'))
// const TransactionComp = require("./transactions");

// import type { InferGetStaticPropsType, GetStaticProps } from 'next'

const db: Database = require("./db.tsx");
const ARRAY_EMPTY = 0;

type Transaction = {
  id: number;
  amount: number;
  category: string;
  tag: string;
  date: string;
}

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

function getData(){
  let transactions: Transaction[] = [];

  console.log(db)

  db.all('SELECT * FROM transactions', [], (err: any, rows: any[]) => {
    if(err){
      throw err;
    }
    rows.forEach((row) => {
      console.log(`processing row number ${transactions.length}`);
      let obj = {
        id: row.id,
        amount: row.amount,
        category: row.category,
        tag: row.tag,
        date: row.date,
      };
      console.log(`obj: ${obj.tag}`);
      transactions[transactions.length] = obj;

    })

    console.log(`test if data is fetched correctly within getData: ${transactions[0].tag}`)
    return transactions;
  });
}

export default async function Home() {
  // let data = await db.all(`SELECT * FROM transactions;`);
  // console.log(data)
  // const {rows: transactions} = data;
  // console.log(transactions);

  const data =  await getData();
  console.log(`test if data has been fetched: ${data}`);

  return (
    <main>
      <h1 className="sr-only">Transactions</h1>
      <AddForm />
      <TransactionComp data={data} />
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