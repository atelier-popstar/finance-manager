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
        <div className="flex flex-col items-center border p-2 border-red-950 bg-red-400 space-y-4">
            <div className="flex rounded-lg justify-center bg-red-100 p-2 w-80">
                <h1 className="text-center text-xl">Change from past month</h1>
            </div>
            
            <div className="flex flex-row justify-around space-x-5  ">
            {trends?.map((cat:categoryTrend) =>(
                <div className="grow flex flex-col w-48 h-32 rounded-lg justify-start p-2  border-red-950 bg-red-100">
                    <h2 className="text-base text-center underline">{dict[cat.category]}</h2>
                    <div className="grow flex flex-row content-center justify-center">
                        <h3 className="text-lg text-center content-center">{cat.amount}</h3>
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
        </div>
        
    )
    }

}

function handleDiv(num1:number,num2:number){
    if (num1 == 0 && num2 ==0){
        return 1;
    } else if (num1==0){
        return 0.99;
    } else if (num2==0){
        return 1.01;
    } else {
        return num1/num2;
    }
}

function calculateTrends(data:MonthExpenseData[]){

    if(data){
        const latestTrends: categoryTrend[] = []
        const thisMonth: MonthExpenseData = data[data.length-1]
        const lastMonth: MonthExpenseData = data[data.length-2]

        const change = {
            admin: handleDiv(thisMonth.Admin, lastMonth.Admin),
            pleasure: handleDiv(thisMonth.Pleasure, lastMonth.Pleasure),
            interpersonal: handleDiv(thisMonth.Interpersonal, lastMonth.Interpersonal),
            groceries: handleDiv(thisMonth.Groceries, lastMonth.Groceries),
            purchases: handleDiv(thisMonth["Gifts & Purchases"], lastMonth["Gifts & Purchases"]),
            food: handleDiv(thisMonth["Food & Drink"], lastMonth["Food & Drink"]), 
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