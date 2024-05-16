'use client'

import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import Header from '../header'
import { Transaction } from "./types";
import TransactionComp from "../transactions";
import TransactionList from './tranlist';
//import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Home() {

  const [date, setDate] = useState<Value>(new Date());

  const dateString: String | void = formatDateObject(date);
  const transactions:Promise<Transaction[]> = TransactionList(dateString)
 

  useEffect(() => {
    
  }, [date])
  
  


  return (
    <div>
      <Header/>
      <Calendar className="border border-red-950" onChange={setDate} value={date}/>
      {/* <TransactionComp data={transactions}/> */}
      <p className="border border-red-950 text-center"><span className='bold'>Selected Date:</span>{' '}
        {date?.toString()}</p>
      </div>
  );
}

function formatDateObject(date: ValuePiece | Value) {

  if(date){
    const year:String = date?.getFullYear().toString();
    const month:String = date?.getMonth().toString();
    const day:String = date?.getDate().toString();

    const output:String = year + '-' + month + '-' + day

    console.log(output)

    return output;
  }
}