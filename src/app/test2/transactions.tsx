"use client";

import React, { useState, useContext } from "react";
import { DeleteForm } from "./delete-form";


type Transaction = {
    id: number;
    amount: number;
    category: string;
    tag: string;
    date: string;
  }

const TransactionComp = ({data}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    console.log(`data received by TransactionComp: ${data}`);

    function dataUpdate() {
        setIsLoaded(true);
    }

    React.useEffect(()=>{
        console.log(`useEffect triggered, new data obj: ${data}`)
        return () => {
            dataUpdate();
        }
    }, [data])

    if(!isLoaded){
        return (
            <p>Loading Transactions...</p>
        )
    } else {
        console.log(`data updated successfully in transactioncomp: ${data}`);
        return (
            <>
                <ul>
                    {data?.map((transaction: Transaction) => (
                        <li key={transaction.id}>
                            {transaction.amount}
                            {transaction.category}
                            {transaction.tag}
                            {transaction.date}
                            <DeleteForm id={transaction.id} name={transaction.tag} />
                        </li>
                    ))}
                </ul>
            
            </>
    
        )
    }

    
}

export default TransactionComp;