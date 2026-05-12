import { randomUUID } from 'crypto';

export class DatabaseMemory {
    #transactions = [];

    create(transaction) {                                           //cria uma transação com id unico
        const newTransaction = { ...transaction, id: randomUUID() };
           this.#transactions.push(newTransaction);
    }

    list() {
        return this.#transactions;
    }
}