"use client";

import { useFormState, useFormStatus } from "react-dom";
import { createTransaction } from "./actions";
import { useEffect, useState } from "react";

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

function formatDate(date: Date) {
  
  var month = '' + (date.getMonth() + 1);
  var day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

export function AddForm({data}: Date) {
  const [state, formAction] = useFormState(createTransaction, initialState);
  const [date, setDate] = useState(formatDate(data))

  useEffect(() => {
    setDate(formatDate(data))
    console.log(`state of data in addform: ${date}`)
  }, [data]);



  console.log(`date read from context:n  ${date}`)
  return (

    <>
    <form className ="flex flex-col"action={formAction}>
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
      <input type="date" id="date" name="date" defaultValue={date} required />
      <SubmitButton/>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
    </>
  );
}

