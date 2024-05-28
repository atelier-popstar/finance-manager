'use server';

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToDatabase } from "./db";

import { Transaction } from './types';
import { Database } from "sqlite";


export async function getLastID(db: Database){
  try{
    const lastTransaction = await db.get(`
    SELECT * FROM transactions WHERE id=(SELECT max(id) FROM transactions);
   `, (err: string, row: Transaction) => {
    if (err) {
      return console.log(`Query failed`)
    }
    return row.id
   });

    console.log(`lastID: ${lastTransaction.id}`)
    return lastTransaction.id
  } catch(e) {
    console.log(`id retrieval failed: ${e}`)
  }

}

export async function createTransaction(prevState: {message: string;}, formData: FormData) {

  console.log(`createTransaction called`);

  const db: Database =  await connectToDatabase("./transactions.db");

  let lastID: number = await getLastID(db);
  lastID++;

  const schema = z.object({
    tag: z.string().min(1),
    amount: z.string().min(1),
    category: z.string().min(1),
    date: z.string().min(1),
  });
  const parse = schema.safeParse({
    tag: formData.get("tag"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    date: formData.get("date"),
  });

  if (!parse.success) {
    return { message: "Failed to create transaction: Z Schema validation failed" };
  }

  const data = parse.data;

  try {
    console.log(`attempting to insert item to DB`)
    await db.run(`
      INSERT INTO transactions 
      VALUES ('${lastID}','${data.amount}', '${data.category}', '${data.tag}', '${data.date}')
    `);
    console.log(` data: ${data.amount, data.category, data.tag, data.date}`)
    revalidatePath("/");
    return { message: `Added transaction ${data.tag}` };
  } catch (e) {
    console.log(`db insert fail: ${e}`)
    return { message: "Failed to create transaction: SQLite DB error" };
  }
}

export async function deleteTransaction(
  prevState: {
    message: string;
  },
  formData: FormData,
) {

  console.log(`deleteTransaction called`)

  const db =  await connectToDatabase("./transactions.db");

  const schema = z.object({
    id: z.string().min(1),
    tag: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    tag: formData.get("tag"),
  });

  try {

    console.log(`id read by delete form: ${data.id}`)
    await db.run(`
      DELETE FROM transactions WHERE id = '${data.id}';
    `);

    revalidatePath("/");
    console.log(`Deleted transaction ${data.tag}`)

    return { message: `Deleted transaction ${data.tag}` };
  } catch (e) {
    console.log(`failed to delete transaction: ${e}`)
    return { message: "Failed to delete transaction" };
  }
}