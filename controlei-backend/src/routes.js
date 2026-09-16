import { registerUser, loginUser ,createTransaction, listTransactions, summaryTransactions, transactionsHistory, 
createGoal, listGoals} from './service.js';
import { authHook } from './authHook.js';
import { z } from 'zod';


export async function userRoutes(app) {
    
    app.post('/register', async (request, reply) => {   //rota para o registro de usuário
        // Validação dos dados usando Zod
        const registerSchema = z.object ({
            email: z.string().email('Email inválido'),
            password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
            name: z.string(),
        })

        const validation = registerSchema.safeParse(request.body);

         if (!validation.success) { //pegamos a primeira mensagem de erro do Zod e devolvemos pro frontend
            const firstError = validation.error.issues[0].message;
            return reply.status(400).send({ error: firstError });
         }

        try { // se os dados não baterem com o formato esperado, o Zod vai lançar um erro
            const newUser = await registerUser(validation.data) //chama a função que sabe como salvar
            return reply.status(201).send(newUser) //devolve uma resposta pro frontend
       
        } catch (error) {

            if (error instanceof Error) { //verifica se o erro é zod
                 return reply.status(400).send({ error: error.message })
                }

            return reply.status(500).send({ error: 'Erro interno do servidor' })
        }
    })


    app.post('/login', async (request, reply) => {  //rota para o login de usuário

        const loginSchema = z.object ({
            email: z.string().email('Email inválido'),
            password: z.string().min(1, 'Senha é obrigatória'),
        })

        const validation = loginSchema.safeParse(request.body);

        if (!validation.success) { //pegamos a primeira mensagem de erro do Zod e devolvemos pro frontend
            const firstError = validation.error.issues[0].message;
            return reply.status(400).send({ error: firstError });
         }

        try {
            const { email, password } = validation.data; //valida os dados que vieram do frontend
    
            const user = await loginUser(email, password) //chama a função que sabe como logar

            const token = await reply.jwtSign( //gera o token JWT
                {sub: user.id,
                name : user.name},
                {
                sign: { expiresIn: '1d'}
                }
        )

            return reply.status(200).send({
                message: 'Login realizado com sucesso',
                token,
            })
        } catch (error) {
            if (error instanceof z.ZodError) { //
                return reply.status(400).send({ error: error.errors[0].message })
            }

        return reply.status(401).send({ error: error.message})
        }
    })
}

export async function transactionRoutes(app) {
    app.addHook ('onRequest', authHook) //adiciona o hook de autenticação para todas as rotas abaixo

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

        const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT

        // 2. PREPARA - chama a função que sabe como salvar
         const newTransaction = await createTransaction({...Transaction, userId})

         // 3. ENTREGA - devolve uma resposta pro frontend
         return reply.status(201).send(newTransaction)
    })

    app.get('/transactions', async (request, reply) => { // 1. PREPARA - chama a função que sabe como listar
        const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT

        const transactions = await listTransactions( userId, request.query.month, request.query.year )

        return reply.send(transactions)
    })

    app.get('/transactions/summary', async (request, reply) => {  // 1. PREPARA - chama a função que sabe como listar
        const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT
       
        const summary = await summaryTransactions( userId, request.query.month, request.query.year )

        return reply.send(summary)
    })

    app.get('/transactions/history', async (request, reply) => {    // Rota para o Histórico financeiro
        const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT
       
        const history = await transactionsHistory (userId) 

        return reply.send (history)
    })
}


export async function goalRoutes(app) {
    app.addHook ('onRequest', authHook) //adiciona o hook de autenticação para todas as rotas abaixo

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

        const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT

        // 2. PREPARA - chama a função que sabe como salvar
        const newGoal = await createGoal({...goal, userId})

        // 3. ENTREGA - devolve uma resposta pro frontend
        return reply.status(201).send(newGoal)
        })


app.get('/goals', async (request, reply) => { // 1. PREPARA - chama a função que sabe como listar
    const userId = request.user.sub //pega o id do usuário que está logado, que foi adicionado no token JWT

    const goals = await listGoals(userId)
    return reply.send(goals)
})
}
