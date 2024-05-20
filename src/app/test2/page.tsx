'use client'

import { useState, useEffect } from 'react';

import Header from '../header'
import { Transaction } from "./types";
import TransactionComp from "../transactions";
import TransactionList from './tranlist';
import DateSwitcher from './calendar';
import { DateContext } from './date-context';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Home() {
  const [date, setDate] = useState<Value>(new Date());
  const value = { date, setDate };
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const dateString: String | undefined = formatDateObject(date)
  console.log(`date value: ${date}`)

  useEffect(() => {
    const results = TransactionList(dateString)
    setTransactions(results)
    console.log(`state of transactions: ${transactions}`)
  }, [date])




  // const dateString: String | void = formatDateObject(date);
  // const transactions: Promise<Transaction[]> = TransactionList(dateString)







  return (
    <div>
      <Header />
      <DateContext.Provider value={value}>
        <DateSwitcher />
      </DateContext.Provider>
      <TransactionComp dataPromise={transactions}/>
      <p className="border border-red-950 text-center">
          <span className='bold'>Selected Date:</span>{' '}
          {date?.toString()}
        </p>
    </div>
  );
}

function formatDateObject(date: Date) {

  if (date) {
    const year: String = date?.getFullYear().toString();
    const month: String = date?.getMonth().toString();
    const day: String = date?.getDate().toString();

    const output: String = year + '-' + month + '-' + day

    console.log(output)

    return output;
  }
}