import { createTransaction, listTransactions, summaryTransactions } from './service.js';
import { z } from 'zod';

/*rotas para usuários
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
    usar essas rotas quando for fazer o login do usuario, por enquanto é so os dados pro banco.
*/

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
    
}
