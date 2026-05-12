//uso para definir as rotas GET, POST, PUT, DELETE 
const express = require('express');
const router = express.Router();

const userController = require('./controllers/userController');
const transactionController = require('./controllers/transactionController');
const categoryController = require('./controllers/categoryController');

/*rotas para usuários
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
    usar essas rotas quando for fazer o login do usuario, por enquanto é so os dados pro banco.
*/

export async function transactionRoutes(app) {
    app.post('/transactions', async (request, reply) => {
        // 1. RECEBE - pega os dados que vieram do frontend
        const { who, company, value, date, type } = request.body

         // 2. PREPARA - chama a função que sabe como salvar
         const newTransaction = createTransaction({ who, company, value, date, type })

         // 3. ENTREGA - devolve uma resposta pro frontend
         return reply.status(201).send(newTransaction)
    })
}
