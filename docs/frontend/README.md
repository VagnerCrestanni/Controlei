# Controlei — Frontend Documentation

## Overview

O frontend do **Controlei** é a interface do sistema de controle financeiro. Ele consome a API do backend e transforma os dados financeiros em informações visuais claras, com layout responsivo para desktop e mobile.

Ele permite que o usuário:

- Crie uma conta e faça login
- Registre receitas, despesas e investimentos
- Visualize o dashboard com gráficos dos últimos 3, 6 e 12 meses
- Consulte o resumo financeiro mensal
- Acompanhe o histórico anual com detalhamento por mês
- Defina metas financeiras com data de expiração

O frontend é construído utilizando:

- React
- Vite
- JavaScript (ES6+)
- React Router
- CSS

## Estrutura principal

```
vite-project/
  src/
    Components/
    Page/
      Dashboard.jsx
      FinancialControl.jsx
      AnnualHistory.jsx
      Login.jsx
      CreateAccount.jsx
    services/
      api.js
    App.jsx
    main.jsx
    index.css
  public/
  vercel.json
  vite.config.js
```

- **Page:** telas completas da aplicação, cada uma com seu arquivo de estilo.
- **Components:** componentes reutilizáveis, como os cards e o gráfico do dashboard.
- **services/api.js:** camada única de comunicação com o backend.
- **vercel.json:** regra de redirecionamento que mantém as rotas do React funcionando ao recarregar a página.

## Páginas

| Página | Função |
| --- | --- |
| Login | Autentica o usuário e salva o token |
| CreateAccount | Cadastro com confirmação de senha validada no frontend |
| Dashboard | Gráfico de linha (3, 6 e 12 meses), totais e metas |
| FinancialControl | Registro e listagem de transações do mês |
| AnnualHistory | Histórico financeiro anual com detalhamento mensal |

## Separação de responsabilidades

- Componentes de página concentram a lógica e o estado (`useState`, `useEffect`).
- Componentes de visualização apenas exibem os dados recebidos por props.
- A comunicação com a API fica isolada em `services/api.js`, sem `fetch` espalhado pelas telas.
- Os dados são recarregados automaticamente após cada nova transação, sem recarregar a página.

## Integração com a API

Todas as chamadas ao backend passam por `services/api.js`:

- **`BASE_URL`:** lida da variável `VITE_API_URL`, com fallback para `http://localhost:3333` no desenvolvimento local.
- **`getHeaders()`:** monta o cabeçalho de cada requisição, lendo o token do `localStorage` no momento da chamada e incluindo `Authorization: Bearer <token>` quando ele existe.
- **Tratamento de erros:** as funções verificam `response.ok` e lançam um erro com a mensagem do backend, que a tela exibe ao usuário.

## Autenticação no frontend

1. O usuário envia email e senha na tela de login.
2. O backend responde com um token JWT.
3. O token é salvo no `localStorage`.
4. Cada requisição às rotas protegidas envia o token no cabeçalho `Authorization`.

O formulário valida campos obrigatórios e formato de email antes de chamar a API, e permite mostrar ou ocultar a senha.

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| VITE_API_URL | Endereço do backend (somente variáveis com prefixo `VITE_` ficam acessíveis no navegador) |

Em desenvolvimento, a variável fica em um arquivo `.env` na pasta do frontend. Em produção, é configurada no painel da Vercel.

## Deploy

O frontend é publicado na **Vercel** com deploy automático a cada push na branch `main`. O arquivo `vercel.json` redireciona qualquer rota desconhecida para o `index.html`, permitindo que o React Router assuma a navegação, inclusive ao recarregar a página.

## Como executar localmente

```bash
cd Controlei/vite-project
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`. Para funcionar por completo, o backend precisa estar rodando em `http://localhost:3333`.