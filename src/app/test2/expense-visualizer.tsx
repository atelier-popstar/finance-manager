import { Transaction, MonthExpenseData } from "./types";



async function categorizeExpense(data: Transaction[]) {

    let months: MonthExpenseData[] = [];

    var lastMonthIndex: string = '';

    let thisMonth: MonthExpenseData = {
        month: '',
        'Admin': 0,
        'Pleasure': 0,
        'Interpersonal': 0,
        'Groceries': 0,
        'Gifts & Purchases': 0,
        'Food & Drink': 0,
    }

    for (let i = 0; i < data.length; i++) {

        let month:string = data[i].date.substring(0, 7);
        let category = data[i].category as keyof typeof thisMonth;
        let amount: number = data[i].amount;

        

        

        if (i == 0) {
            lastMonthIndex = month;
            thisMonth.month = month;
        }

        if (month != lastMonthIndex) {
            months[months.length] = thisMonth;
            lastMonthIndex = month;

            thisMonth = {
                month: '',
                'Admin': 0,
                'Pleasure': 0,
                'Interpersonal': 0,
                'Groceries': 0,
                'Gifts & Purchases': 0,
                'Food & Drink': 0,
            }
        }

        thisMonth[category] += amount;

    }

    
    months[months.length] = thisMonth;

    return months;
}

async function trimDates(data: Transaction[]) {
    for (let i = 0; i< data.length; i++){
        data[i].date = data[i].date.substring(0, 7);
        // console.log(`index ${i} date: ${data[i].date}`)
    }
    return data;
}


export async function parseByMonth(data: Transaction[]) {
    console.log('parsebymonth called')
    const trimmedData = await trimDates(data);
    trimmedData.sort((a, b) => a.category.localeCompare(b.category))
    trimmedData.sort((a, b) => a.date.localeCompare(b.date))

    const sortedData: MonthExpenseData[] = await categorizeExpense(trimmedData);

    return sortedData;
}

