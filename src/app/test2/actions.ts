"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

const db = require("./db.tsx");

// CREATE TABLE todos (
//   id SERIAL PRIMARY KEY,
//   text TEXT NOT NULL
// );

export async function createTransaction(prevState: {message: string;}, formData: FormData) {
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
    date: formData.get("tag"),
  });

  if (!parse.success) {
    return { message: "Failed to create transaction: Z Schema validation failed" };
  }

  const data = parse.data;

  try {
    await db.run(`
      INSERT INTO todos (text)
      VALUES (${data.amount}, ${data.category}, ${data.tag}, ${data.date}, )
    `);

    revalidatePath("/");
    return { message: `Added transaction ${data.tag}` };
  } catch (e) {
    return { message: "Failed to create transaction: SQLite DB error" };
  }
}

export async function deleteTransaction(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
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