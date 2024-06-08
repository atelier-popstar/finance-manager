'use client';

import { DonutChart } from '@tremor/react';
import { MonthExpenseData } from "./types";
import React, { useState } from "react";



const valueFormatter = (number: number | bigint) =>
    `€${Intl.NumberFormat('eur').format(number).toString()}`;


type ExpenseChartProps = {
    data: MonthExpenseData[];
};

type summedExpense = {
    name: string;
    value: number;
}

type SummedExpenseData = {
    data: summedExpense[];
}

const ExpenseChart = ({data}: ExpenseChartProps) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [expenseData, setExpenseData] = useState<SummedExpenseData>({data:[]});


    function dataUpdate() {

        let sumMonthsResults:SummedExpenseData = sumMonths(data)
        
        setExpenseData(sumMonthsResults);
        setIsLoaded(true);

    }

    React.useEffect(()=>{
        console.log(`useEffect triggered in ExpenseChart, new data obj: ${data}`)
        return () => {
            dataUpdate();
        }
    }, [data])

    function sumMonths(monthData:MonthExpenseData[]){
        let result: SummedExpenseData = {
            data: [
                {
                    name:"Admin",
                    value: 0,
                },
                {
                    name:"Pleasure",
                    value: 0,
                },
                {
                    name:"Interpersonal",
                    value: 0,
                },
                {
                    name:"Groceries",
                    value: 0,
                },
                {
                    name:"Gifts & Purchases",
                    value: 0,
                },
                {
                    name:"Food & Drink",
                    value: 0,
                },
            ]
        }

        if(monthData){
            for (let i=0;i<monthData.length;i++){

                result.data[0].value+=monthData[i].Admin;
                result.data[1].value+=monthData[i].Pleasure;
                result.data[2].value+=monthData[i].Interpersonal;
                result.data[3].value+=monthData[i].Groceries;
                result.data[4].value+=monthData[i]['Gifts & Purchases'];
                result.data[5].value+=monthData[i]['Food & Drink'];
            }
        }


        console.log(`state of result in sumMonths:
            ${result.data[0].value}\n
            ${result.data[1].value}\n
            ${result.data[2].value}\n
            ${result.data[3].value}\n
            ${result.data[4].value}\n
            ${result.data[5].value}\n
            `)

        return result;
    }

    if(!isLoaded){
        return (
            <p>Loading Chart...</p>
        )
    } else {
        console.log(`data updated successfully in piechart: ${data}`);
        return (
        <div className="flex justify-center w-200 h-200">
            <DonutChart
                data={expenseData.data}
                variant="pie"
                valueFormatter={valueFormatter}
                onValueChange={(v) => console.log(v)}
            />
        </div>

        );
    }

    
}



export default ExpenseChart;