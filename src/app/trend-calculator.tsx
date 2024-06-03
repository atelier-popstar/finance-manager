'use client';

import { MonthExpenseData } from "./types";
import React, { useState } from "react";

type TrendBoxProps = {
    data: MonthExpenseData[];
};

type categoryTrend = {
    category: string;
    amount: number;
    trend: boolean;
}

const TrendBox = ({data}:TrendBoxProps) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [trends, setTrends] = useState([])



    function dataUpdate() {
        setIsLoaded(true);
    }

    React.useEffect(()=>{
        console.log(`useEffect triggered, new data obj: ${data}`)
        setTrends(calculateTrends(data))
        return () => {
            dataUpdate();
        }
    }, [data])

    


    if(!isLoaded){
        return (
            <p>Loading Trends...</p>
        )
    } else {



    return(
        <ul className="flex-col p-2 border border-red-950 ">
            {trends?.map((cat:categoryTrend) =>(
                <li className="flex-row p-2 border border-red-950">
                    {cat.category}{cat.amount}{cat.trend.toString()}
                    

                </li>
            ))}
        </ul>
    )
    }

}



function calculateTrends(data:MonthExpenseData[]){


    if(data){
        const latestTrends: categoryTrend[] = []
        const thisMonth: MonthExpenseData = data[data.length-1]
        const lastMonth: MonthExpenseData = data[data.length-2]
    
        console.log(`dp1: ${thisMonth.Admin}, dp2: ${lastMonth.Admin}`)

        const change = {
            admin: thisMonth.Admin-lastMonth.Admin,
            pleasure: thisMonth.Pleasure-lastMonth.Pleasure,
            interpersonal: thisMonth.Interpersonal-lastMonth.Interpersonal,
            groceries: thisMonth.Groceries-lastMonth.Groceries,
            purchases: thisMonth["Gifts & Purchases"]-lastMonth["Gifts & Purchases"],
            food: thisMonth["Food & Drink"]-lastMonth["Food & Drink"],
        }      

        console.log(`
            trends:\n
            admin: ${change.admin}\n
            food:${change.food}
        `)

        for (let category in change){
            var trend:boolean = false

            if(change[category] >= 0){
                trend = true;

            }

            latestTrends[latestTrends.length] = {
                category: category,
                amount: change[category],
                trend:  trend,
            }

        }

        for(let i=0;i<latestTrends.length;i++){
            console.log(`
            cat: ${latestTrends[i].category}\n
            amt: ${latestTrends[i].amount}\n
            uptrend: ${latestTrends[i].trend}\n
            `)
        }

        return latestTrends

    }

    return [];

    

}


export default TrendBox;