import prisma from "../config/prisma.js";

export const calculateFinancialScore = async (userId) => {

    const transactions = await prisma.transaction.findMany({
        where:{
            userId
        }
    });

    const goals = await prisma.goal.findMany({
        where:{
            userId
        }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach((t)=>{

        if(t.type==="INCOME")
            income += t.amount;

        else
            expense += t.amount;

    });

    const savings = income-expense;

    let score = 50;

    if(income>0){

        const savingRate = (savings/income)*100;

        score += savingRate*0.30;

    }

    score += goals.length*2;

    if(score>100)
        score=100;

    if(score<0)
        score=0;

    return{

        score:Math.round(score),

        income,

        expense,

        savings

    };

};