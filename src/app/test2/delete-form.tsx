"use client";

import { useFormState, useFormStatus } from "react-dom";
import { deleteTransaction } from "./actions";

const initialState = {
  message: "",
};

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Delete
    </button>
  );
}

export function DeleteForm({ id, name }: { id: number; name: string }) {
  const [state, formAction] = useFormState(deleteTransaction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="name" value={name} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}