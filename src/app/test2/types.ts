export type Transaction = {
    id: number;
    amount: number;
    category: string;
    tag: string;
    date: string;
};

export type MonthExpenseData = {
  month: string;
  expense: SpendingCategory[]
};

export type SpendingCategory = {
  tag: string;
  amount: number;
};