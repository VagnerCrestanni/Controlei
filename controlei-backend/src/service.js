import { transactions } from './database_memory.js';
import { randomUUID } from 'crypto';

export function createTransaction(transaction) {
    
    const newTransaction = { 
        id: randomUUID(),
        who: transaction.who,
        company: transaction.company,
        value: transaction.value,
        date: transaction.date,
        type: transaction.type,
    }
        
    transactions.push(newTransaction)

    return newTransaction;
}