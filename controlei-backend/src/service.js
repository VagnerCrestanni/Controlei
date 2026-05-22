import { randomUUID } from 'crypto';
import { DatabaseMemory } from './database_memory.js';

const db = new DatabaseMemory()

export function createTransaction(transaction) {  
    
    const newTransaction = { //cria uma nova transação
        id: randomUUID(),
        who: transaction.who,
        company: transaction.company,
        value: transaction.value,
        date: transaction.date,
        type: transaction.type,
    } 
    db.create(newTransaction)

    return newTransaction;
}

export function listTransactions() {

    const transactions = db.list() //chama a função list da classe DatabaseMemory para listar as transações

    return transactions;
}

export function summaryTransactions() {

    const summary = db.list().reduce((acc, transaction) => { //summary é onde soma cada 'type' e mostra o valor total de cada um
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