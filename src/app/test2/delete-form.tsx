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

export function DeleteForm({ id, tag }: { id: number; tag: string }) {
  const [state, formAction] = useFormState(deleteTransaction, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="tag" value={tag} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}