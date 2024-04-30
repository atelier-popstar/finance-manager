'use client';

import { LineChart } from '@tremor/react';
import { Transaction } from "./types";
import React, { useState, useContext } from "react";



const valueFormatter = (number: number | bigint) =>
    `€${Intl.NumberFormat('eur').format(number).toString()}`;


type TransactionGraphProps = {
    data: Object[];
};
const TransactionGraph = ({data}: TransactionGraphProps) => {

    const [isLoaded, setIsLoaded] = useState(false);

    console.log(`${data}`)
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
            <p>Loading Graph...</p>
        )
    } else {
        console.log(`data updated successfully in transactiongraph: ${data}`);
        return (
        
            <>
                <LineChart
                    data={data}
                    index="date"
                    categories={[
                        'Groceries',
                        'Pleasure',
                        'Communist Memoribilia',
                    ]}
                    colors={['blue', 'violet', 'fuchsia']}
                    valueFormatter={valueFormatter}
                    yAxisWidth={55}
                    onValueChange={() => { }}
                    className="mt-6 hidden h-96 sm:block"
                />
            </>
        );
    }

    
}

export default TransactionGraph;