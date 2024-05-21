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
                        <li className="p-4 bg-red-100 border border-red-950" key={transaction.id}>
                            {transaction.tag} {transaction.amount} {transaction.category}
                            <p className="border border-red-950 bg-red-500">                                  
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