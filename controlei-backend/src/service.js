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
                gte: new Date (`${year}-${String(month).padStart(2, '0')}-01`), //uso para as transações para filtrar e limpar cada mes
                lt: new Date (year, month,1), 
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

export async function transactionsHistory() { //função para o histórico financeiro

    const transactions = await prisma.transaction.findMany()    //busca todas as transações do banco de dados
    
    const History = transactions.reduce((acc, transaction) => { 

        const date = new Date(transaction.date)  
        const year = date.getFullYear()
        const month = date.getMonth() + 1

        const groupKey = `${year}-${month}`    // Agrupa as transações por ano e mês
        if (!acc[groupKey]) {
            acc[groupKey] = { income: 0, expense: 0, investment: 0 }
        }
        acc[groupKey].income += transaction.type === 'income' ? transaction.value : 0
        acc[groupKey].expense += transaction.type === 'expense' ? transaction.value : 0
        acc[groupKey].investment += transaction.type === 'investment' ? transaction.value : 0
        return acc
    }, {})
    return History
}