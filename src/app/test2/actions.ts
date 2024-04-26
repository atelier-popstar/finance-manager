"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { connectToDatabase } from "./db";
import React from "react";

import { Transaction } from './types';
import { skip } from "node:test";
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

  const db =  await connectToDatabase("./transactions.db");

  const lastID = await getLastID(db)

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
      VALUES ('${lastID+1}','${data.tag}', '${data.amount}', '${data.category}', '${data.date}')
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

  const db =  await connectToDatabase("./transactions.db");
  const schema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
  });
  const data = schema.parse({
    id: formData.get("id"),
    todo: formData.get("name"),
  });

  try {
    await db.run(`
      DELETE FROM todos
      WHERE id = ${data.id};
    `);

    revalidatePath("/");
    return { message: `Deleted transaction ${data.name}` };
  } catch (e) {
    return { message: "Failed to delete transaction" };
  }
}