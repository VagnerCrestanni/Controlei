//Chamado para a API
export async function createTransaction(data) { //Conecta o createTransaction do backend com o front end, passando os dados do formulário para a API
    const response = await fetch('http://localhost:3333/transactions', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    return response.json();
}

export async function listTransactions(month, year) { //Conecta o listTransactions do backend com o front end, para listar as transações
    const response = await fetch(`http://localhost:3333/transactions?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
    });
    return response.json();
} 

export async function getSummary(month, year) { //Conecta o summaryTransactions do backend com o front end, para mostrar o resumo das transações
    const response = await fetch(`http://localhost:3333/transactions/summary?month=${month}&year=${year}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    });
    return response.json();
} 