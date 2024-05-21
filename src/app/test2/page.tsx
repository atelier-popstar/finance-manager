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


  //  useEffect(() => {
  //   const dateString: String = formatDateObject(date)
  //   console.log(`date value: ${date}`)
  //   const results = TransactionList(dateString)
  //   setTransactions(results)
  //   console.log(`state of transactions: ${transactions}`)
  //  }, [date])

  useEffect(() => {
    (async () => {
      const dateString: String = formatDateObject(date)
      const results: Transaction[] = await TransactionList(dateString)
      setTransactions(results)
      console.log(`state of transactions: ${transactions}`)
    })();

    return () => {

    }

  }, [date])




  // const dateString: String | void = formatDateObject(date);
  // const transactions: Promise<Transaction[]> = TransactionList(dateString)







  return (
    <div>
      <Header />
      <div className="flex flex-row">
      <DateContext.Provider value={value}>
        <DateSwitcher />
      </DateContext.Provider>
      <TransactionComp data={transactions} />
      </div>
      <p className="border border-red-950 text-center">
        <span className='bold'>Selected Date:</span>{' '}
        {date?.toString()}
      </p>
    </div>
  );
}

function formatDateObject(date: Value) {

  if (date) {
    const year: String = date?.getFullYear().toString();
    const month: Number = date?.getMonth() + 1;
    let day: String = date?.getDate().toString();

    if(day.length < 2){
      day = '0' + day;
    }

    const realMonth:String = '0' + month.toString();

    

    const output: String = year + '-' + realMonth+ '-' + day

    console.log(`formatDateObject success: ${output}`)

    return output;
  }

  console.log(`date not supplied. supplying default datestring`)
  return '2024-5-21'
}