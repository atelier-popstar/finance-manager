"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTransaction } from "./actions";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add Transaction
    </button>
  );
}

export function AddForm() {
  const [state, formAction] = useFormState(createTransaction, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="transaction">Transaction Name</label>
      <input type="text" id="tag" name="tag" required />
      <label htmlFor="amount">Transaction Amount</label>
      <input type="text" id="amount" name="amount" required />
      <label htmlFor="category">Transaction Category</label>
      <select id="category" name="category" required>
        <option value = "Admin">Admin</option>
        <option value = "Pleasure">Pleasure</option>
        <option value = "Interpersonal">Interpersonal</option>
        <option value = "Groceries">Groceries</option>
        <option value = "Gifts & Purchases">Gifts & Purchases</option>
        <option value = "Food & Drink">Food & Drink</option>
      </select>
      <label htmlFor="date">Transaction Date</label>
      <input type="date" id="date" name="date" required />
      <SubmitButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}