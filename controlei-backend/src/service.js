import { prisma } from './prisma.js';
import bcrypt from 'bcryptjs';

export async function registerUser(user) { 
      //função para registrar usuário
    const existingUser = await prisma.user.findUnique({ //verifica se o usuário já existe no banco de dados
        where: { email: user.email }
    })
    if (existingUser) {
        throw new Error('Usuário já cadastrado') //se o usuário já existir, lança um erro
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10; //número de rounds para o hash da senha

    const hashedPassword = await bcrypt.hash(user.password, saltRounds); //hash da senha do usuário

    user.hashedPassword = hashedPassword; //atribui a senha hasheada ao usuário

    const newUser = await prisma.user.create({  //cria um novo usuário no banco de dados
        data: {
            email: user.email,
            password_hash: hashedPassword,
            name: user.name,
        }
    })
    delete newUser.password; //remove a senha do usuário antes de retornar

    return newUser;
}

export async function loginUser(email, password) {
    //função para logar usuário
    const user = await prisma.user.findUnique({
        where: { email: email }
    })
    if (!user) { //verifica se o usuário existe no banco de dados
        throw new Error('Email ou senha incorretos')
    } 
    const passwordMatch = await bcrypt.compare(password, user.password_hash); //compara a senha do usuário com a senha hasheada no banco de dados
    if (!passwordMatch) { //verifica se a senha do usuário está correta
        throw new Error('Email ou senha incorretos')
    }
    return { 
        id: user.id,
        email: user.email,
        name: user.name,
    };
}

export async function createTransaction(transaction) {  
    
    const newTransaction = await prisma.transaction.create ({ //cria uma nova transação
        data : {  
            who: transaction.who,
            company: transaction.company,
            value: transaction.value,
            date: transaction.date,
            type: transaction.type,
            userId: transaction.userId, //associa a transação ao usuário
         }
    })

    return newTransaction;
}

export async function listTransactions(month, year) { //lista as transações

    const transaction = await prisma.transaction.findMany ({
        where: {
            userId: transaction.userId,
            
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
            userId: transaction.userId,

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

    const transactions = await prisma.transaction.findMany({//busca todas as transações do banco de dados
        where: {
            userId: transaction.userId,
        },
    }) 
       
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


export async function createGoal(goal) {    //função para criar uma meta financeira

    const newGoal = await prisma.goal.create({
        data: {
            endDate: goal.endDate,
            value: goal.value,
            type: goal.type,
            userId: goal.userId, //associa a meta ao usuário
        }
    })
    return newGoal;
}

export async function listGoals () {    //função para listar as metas financeiras
   
    const goals = await prisma.goal.findMany({
        where: { userId: goal.userId }
    })
    return goals;
}