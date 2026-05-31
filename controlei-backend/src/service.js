import { prisma } from './prisma.js';

export async function createTransaction(transaction) {  
    
    const newTransaction = await prisma.transaction.create ({ //cria uma nova transação
        data : {  
            who: transaction.who,
            company: transaction.company,
            value: transaction.value,
            date: transaction.date,
            type: transaction.type,
         }
    })

    return newTransaction;
}

export async function listTransactions() { //lista as transações

    const transaction = await prisma.transaction.findMany()

    return transaction;
}

export async function summaryTransactions() {

    const transaction = await prisma.transaction.findMany()

    const summary = transaction.reduce((acc, transaction) => { //summary é onde soma cada 'type' e mostra o valor total de cada um
       if (transaction.type === 'income') {
        acc.income += transaction.value

       } else if (transaction.type === 'expense') {
        acc.expense += transaction.value

       } else if (transaction.type === 'investment') {
        acc.investment += transaction.value

       } return acc 
    }, { income: 0, expense: 0, investment: 0 })

    return summary
} 