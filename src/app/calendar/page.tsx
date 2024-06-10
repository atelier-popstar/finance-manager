'use client'

import { useState, useEffect, useContext } from 'react';

import Header from '../header'
import { Transaction } from "../types";
import TransactionComp from "../transactions";
import TransactionList from './tranlist';
import DateSwitcher from './calendar';
import { DateContext } from './date-context';
import { AddForm } from '../add-form';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Home() {
  const [date, setDate] = useState<Value>(new Date());
  const value = { date, setDate };
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [editorToggle, setEditorToggle] = useState<Boolean>(false)
  const toggleEditor = () => {
    setEditorToggle(value => !value)
    console.log(`toggled editor to ${editorToggle}`)
  }


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
      <p className="grow">
        {editorToggle ? (<TransactionComp data={transactions} />) : (<AddForm data = {date}/>) }
        <div className="flex grow justify-center">
          <button className="p-4 rounded-lg bg-red-200 hover:bg-red-300 p-1"onClick={toggleEditor}>Toggle Transaction Editor</button>
        </div>
        
      </p>
      </div>
    </div>
  );
}



function formatDateObject(date: Value) {

  if (date) {
    const year: String = date?.getFullYear().toString();
    let month: String = (date?.getMonth() + 1).toString();
    let day: String = date?.getDate().toString();

    if(day.length < 2){
      day = '0' + day;
    }

    if(month.length < 2){
      month = '0' + month;
    }

    

    const output: String = year + '-' + month+ '-' + day

    console.log(`formatDateObject success: ${output}`)

    return output;
  }

  console.log(`date not supplied. supplying default datestring`)
  return '2024-5-21'
}