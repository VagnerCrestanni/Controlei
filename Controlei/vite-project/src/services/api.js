const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333'; //BASE_URL é a variável de ambiente que armazena a URL da API, caso não exista, será usado o valor padrão 'http://localhost:3333'

const getHeaders = () => { //função para centralizar a chamada do token no header
    const token = localStorage.getItem('token'); //Pega o token do localStorage e passa para o header, para que o back saiba que o usuario está logado corretamente
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }) //Se o token existir, adiciona o header Authorization com o token
    };
};

export async function registerUser(data) { //Conecta o registerUser do backend com o front end, passando os dados do formulário para a API
    const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function loginUser(data) { //Conecta o loginUser do backend com o front end, passando os dados do formulário para a API
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

//Chamado para a API
export async function createTransaction(data) { //Conecta o createTransaction do backend com o front end, passando os dados do formulário para a API
    const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function listTransactions(month, year) { //Conecta o listTransactions do backend com o front end, para listar as transações
    const response = await fetch(`${BASE_URL}/transactions?month=${month}&year=${year}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    return response.json();
} 

export async function getSummary(month, year) { //Conecta o summaryTransactions do backend com o front end, para mostrar o resumo das transações
    const response = await fetch(`${BASE_URL}/transactions/summary?month=${month}&year=${year}`, {
        method: 'GET',
        headers: getHeaders(),
    });
    return response.json();
} 

export async function getHistory() { //Conecta o transactionsHistory do backend com o front end, para mostrar o histórico das transações
    const response = await fetch(`${BASE_URL}/transactions/history`, {
        method: 'GET',
        headers: getHeaders(),
    });
    return response.json();
}

export async function createGoal(data) { //Conecta o createGoal do backend com o front end, passando os dados do formulário para a API
    const response = await fetch(`${BASE_URL}/goals`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function listGoals() { //Conecta o listGoals do backend com o front end, para listar as metas
    const response = await fetch(`${BASE_URL}/goals`, {
        method: 'GET',
        headers: getHeaders(),
    });
    return response.json();
}
