'use client';

import { MonthExpenseData } from "./types";
import React, { useState } from "react";

type TrendBoxProps = {
    data: MonthExpenseData[];
};

type categoryTrend = {
    category: string;
    amount: string;
    trend: boolean;
}

const dict = {
    admin: "Admin",
    pleasure: "Pleasure",
    interpersonal: "Interpersonal",
    groceries: "Groceries",
    purchases: "Gifts & Purchases",
    food: "Food & Drink",
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
        <div className="flex flex-row justify-around p-2 border space-x-5 border-red-950 bg-red-400 ">
            {trends?.map((cat:categoryTrend) =>(
                <div className="grow flex flex-col h-48 rounded-lg justify-start p-2 border border-red-950 bg-red-100">
                    <h2 className="text-center underline">{dict[cat.category]}</h2>
                    <div className="grow flex flex-row content-center justify-center">
                        <h3 className="text-center content-center">{cat.amount}</h3>
                        {cat.trend ?
                        <div className="content-center"> 
                        <svg className=" fill-red-600" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,30 15,0 30,30" />
                        </svg> 
                        </div> 
                        : 
                        <div className="content-center"> 
                        <svg className=" fill-emerald-600" height="30" width="30" xmlns="http://www.w3.org/2000/svg">
                            <polygon points="0,0 15,30 30,0" />
                        </svg>
                        </div> 
                        }
                    </div>
                    
                    

                </div>
            ))}
        </div>
    )
    }

}



function calculateTrends(data:MonthExpenseData[]){

    if(data){
        const latestTrends: categoryTrend[] = []
        const thisMonth: MonthExpenseData = data[data.length-1]
        const lastMonth: MonthExpenseData = data[data.length-2]

        const change = {
            admin: thisMonth.Admin / lastMonth.Admin,
            pleasure: thisMonth.Pleasure / lastMonth.Pleasure,
            interpersonal: thisMonth.Interpersonal / lastMonth.Interpersonal,
            groceries: thisMonth.Groceries / lastMonth.Groceries,
            purchases: thisMonth["Gifts & Purchases"] / lastMonth["Gifts & Purchases"],
            food: thisMonth["Food & Drink"] / lastMonth["Food & Drink"],
        }      

        console.log(`
            trends:\n
            admin: ${change.admin}\n
            food:${change.food}
        `)

        for (let category in change){
            var trend:boolean = false
            var percentage = 0
            var changeString = ""

            if(change[category] > 1){
                trend = true;
                percentage = change[category]-1
                changeString = (percentage * 100).toString().substring(0,6) + "%"
                
            } else if (change[category] == 1){
                changeString = "0%"
            } else if (change[category] < 1){
                percentage = 1-change[category]
                changeString = (percentage * 100).toString().substring(0,6) + "%"
            }

            latestTrends[latestTrends.length] = {
                category: category,
                amount: changeString,
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