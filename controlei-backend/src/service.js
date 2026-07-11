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

export async function listTransactions(month, year) { //lista as transações

    const transaction = await prisma.transaction.findMany ({
        where: {
            date: { 
                gte: new Date (`${year}-${String(month).padStart(2, '0')}-01`), //uso para as transações para filtrar e limar cada mes
                lt: new Date (year, month,1), //uso para as transações para filtrar e limpar cada mes 
            }
        }
    })

    return transaction;
}

export async function summaryTransactions(month, year) {

    const transaction = await prisma.transaction.findMany({
        where: {
            date: {
                gte: new Date(`${year}-${String(month).padStart(2, '0')}-01`),
                lt: new Date(year, month, 1),
            }
        }
    })
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