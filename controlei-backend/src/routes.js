import { createTransaction, listTransactions, summaryTransactions, transactionsHistory, 
createGoal, listGoals} from './service.js';
import { z } from 'zod';


export async function userRoutes(app) {
    app.post('/users', async (request, reply) => {
        // Validação dos dados usando Zod
        const createUserSchema = z.object ({
            email: z.email('Email inválido'),
            password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
            name: z.string().optional(),
        })
    })

    app.get('/users', async (request, reply) => {

        const loginUserSchema = z.object ({
            email: z.email('Email inválido'),
            password: z.string().min(1, 'Senha é obrigatória'),
        })
    })
}

export async function transactionRoutes(app) {
    app.post('/transactions', async (request, reply) => {
        // Validação dos dados usando Zod
        const createTransactionSchema = z.object ({
            who: z.string(),
            company: z.string(),
            value: z.number(),
            date: z.coerce.date().transform((date)=> date.toISOString()),
            type: z.enum(['income', 'expense', 'investment']),
        })

        // 1. RECEBE - pega os dados que vieram do frontend
        let Transaction;
        try { // se os dados não baterem com o formato esperado, o Zod vai lançar um erro
            Transaction = createTransactionSchema.parse(request.body);
        } catch (error) {
            return reply.status(400).send({ error: error.errors })
        }

        // 2. PREPARA - chama a função que sabe como salvar
         const newTransaction = await createTransaction(Transaction)

         // 3. ENTREGA - devolve uma resposta pro frontend
         return reply.status(201).send(newTransaction)
    })

    app.get('/transactions', async (request, reply) => {
        // 1. PREPARA - chama a função que sabe como listar
        const transactions = await listTransactions( request.query.month, request.query.year)

        return reply.send(transactions)
    })

    app.get('/transactions/summary', async (request, reply) => {
        // 1. PREPARA - chama a função que sabe como listar
        const summary = await summaryTransactions(  request.query.month, request.query.year)

        return reply.send(summary)
    })

    app.get('/transactions/history', async (request, reply) => {    // Rota para o Histórico financeiro
       
        const history = await transactionsHistory () 

        return reply.send (history)
    })
}


export async function goalRoutes(app) {
    app.post('/goals', async (request, reply) => { 
        // Validação dos dados usando Zod
        const createGoalSchema = z.object ({
            endDate: z.coerce.date().transform((date)=> date.toISOString()),
            value: z.number(),
            type: z.enum(['income', 'expense', 'investment']),
        })

        let goal;
        try { // se os dados não baterem com o formato esperado, o Zod vai lançar um erro
            goal = createGoalSchema.parse(request.body);
        } catch (error) {
            return reply.status(400).send({ error: error.errors })
        }
        // 2. PREPARA - chama a função que sabe como salvar
        const newGoal = await createGoal(goal)

        // 3. ENTREGA - devolve uma resposta pro frontend
        return reply.status(201).send(newGoal)
        })


app.get('/goals', async (request, reply) => {
    const goals = await listGoals()
    return reply.send(goals)
})
}
