export type Transaction = {
    id: number;
    amount: number;
    category: string;
    tag: string;
    date: string;
};

export type MonthExpenseData = {
  month: string;
  'Admin': number;
  'Pleasure': number;
  'Interpersonal': number;
  'Groceries': number;
  'Gifts & Purchases': number;
  'Food & Drink': number;
};