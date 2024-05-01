import { Transaction, MonthExpenseData, SpendingCategory } from "./types";



async function categorizeExpense(data: Transaction[]) {

    let months: MonthExpenseData[] = [];

    var lastMonthIndex: string = '';
    var lastCategoryIndex: string = '';

    let thisMonth: MonthExpenseData = {
        month: '',
        expense: []
    }

    let thisCategory: SpendingCategory = {
        tag: '',
        amount: 0,
    }

    for (let i = 0; i < data.length; i++) {

        let month = data[i].date.substring(0, 7);
        let category = data[i].category;
        let amount = data[i].amount;

        

        if (i == 0) {
            lastMonthIndex = month;
            thisMonth.month = month;
            lastCategoryIndex = category;
            thisCategory.tag = category;
        }

        if (month == lastMonthIndex) {
            if (category == lastCategoryIndex) {
                thisCategory.amount += amount;

            } else {
                thisMonth.expense[thisMonth.expense.length] = thisCategory;
                thisCategory = {
                    tag: category,
                    amount: amount,
                }
                lastCategoryIndex = category;
            }

        } else {
            thisMonth.expense[thisMonth.expense.length] = thisCategory;
            thisCategory = {
                tag: category,
                amount: amount,
            }
            lastCategoryIndex = category;


            months[months.length] = thisMonth;
            thisMonth = {
                month: month,
                expense: [],
            }
            lastMonthIndex = month;

        }
    }

    thisMonth.expense[thisMonth.expense.length] = thisCategory;
    months[months.length] = thisMonth;

    return months;
}

async function toJSON(data: MonthExpenseData[]) {

    let output: Object[] = [];
    for (let i=0; i< data.length; i++){
        let month: string = data[i].month;
        let string: string = `{"date":"${month}"`;
        console.log(string)
        for (let j=0; j< data[i].expense.length; j++){
            let tag: string = data[i].expense[j].tag;
            let amount: string = data[i].expense[j].amount.toString();
            let catString:string = `"${tag}":${amount}`;
            string = string.concat(', ', catString);
            console.log(string);
        }
        string = string.concat(' ', '}');
        console.log(string)
        const obj: Object = JSON.parse(string);
        console.log(`obj: ${obj}`)
        output[output.length] = obj
    }

    return output;

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
    const dataJSON = await toJSON(sortedData);



    return dataJSON;
}

