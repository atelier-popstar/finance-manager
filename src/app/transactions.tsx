"use client";

import React, { useState, useContext } from "react";
import { DeleteForm } from "./delete-form";
import { Transaction } from "./types";

type TransactionCompProps = {
    data: Transaction[];
};

const TransactionComp = ({data}: TransactionCompProps) => {
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
                        <li className="flex flex-row space-x-2 p-4 bg-red-100 border border-red-950" key={transaction.id}>
                            <p className="flex-initial rounded-lg p-2 bg-red-300"> {transaction.tag}</p>
                            <p className="flex-initial rounded-lg p-2 bg-red-200"> {transaction.amount}€</p>
                            <p className="flex-initial rounded-lg p-2 bg-red-200"> {transaction.category}</p> 
                            <p className="flex flex-grow"></p>
                            <p className="flex flex-initial justify-self-end rounded-lg p-2 bg-red-500 hover:bg-red-600">                                  
                            <DeleteForm id={transaction.id} tag={transaction.tag} />
                            </p>
                        </li>
                    ))}
                </ul>
            
            </>
    
        )
    }

    
}

export default TransactionComp;