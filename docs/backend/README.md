# Controlei — Backend Documentation

## Overview

O backend do **Controlei** é a API responsável pela lógica de negócio, autenticação e persistência dos dados do sistema de controle financeiro.

Ele permite que o frontend:

- Cadastre usuários e autentique logins
- Registre receitas, despesas e investimentos
- Consulte transações filtradas por mês e ano
- Gere resumos e histórico financeiro
- Gerencie metas financeiras

O backend é construído utilizando:

- Node.js
- Fastify
- PostgreSQL
- Prisma ORM
- Zod (validação de dados)
- JWT e bcrypt (autenticação)

## Estrutura principal

```
controlei-backend/
  prisma/
    schema.prisma
    migrations/
  src/
    routes.js
    service.js
    authHook.js
    prisma.js
  server.js
  routes.http
```

- **routes.js:** declara as rotas, valida os dados de entrada com Zod e chama o service.
- **service.js:** concentra a lógica de negócio e as consultas ao banco.
- **authHook.js:** hook que verifica o token JWT antes de liberar as rotas protegidas.
- **schema.prisma:** define os modelos `User`, `Transaction` e `Goal`.
- **routes.http:** requisições de teste manual das rotas.

## Rotas principais

| Método | Rota | Descrição | Protegida |
| --- | --- | --- | --- |
| POST | /register | Cadastro de usuário | Não |
| POST | /login | Login e geração do token | Não |
| POST | /transactions | Cria uma transação | Sim |
| GET | /transactions | Lista transações por mês e ano | Sim |
| GET | /transactions/summary | Resumo financeiro do período | Sim |
| GET | /transactions/history | Histórico anual | Sim |
| POST | /goals | Cria uma meta | Sim |
| GET | /goals | Lista as metas | Sim |

## Autenticação e segurança

- Senhas armazenadas apenas como hash (bcrypt), nunca em texto puro.
- Login retorna um token JWT de curta duração (2 horas).
- Rotas protegidas exigem o token no header `Authorization: Bearer <token>`.
- Limite de tentativas de login: após 5 erros, o acesso fica bloqueado por 30 minutos.
- Todas as consultas de transações e metas são filtradas pelo usuário logado, garantindo que um usuário não acesse dados de outro.
- Dados de entrada validados com Zod antes de chegar à lógica de negócio.
- CORS configurado para aceitar apenas a origem do frontend.

## Banco de dados

O projeto usa **PostgreSQL** com **Prisma ORM**. Os modelos principais são:

- **User:** nome, email único, hash da senha e datas de criação e atualização.
- **Transaction:** quem, entidade, valor, data, tipo e vínculo com o usuário.
- **Goal:** valor, data de expiração, tipo (`income`, `expense` ou `investment`) e vínculo com o usuário.

As alterações de estrutura são versionadas em migrations dentro de `prisma/migrations`.

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| DATABASE_URL | Conexão do Prisma com o banco |
| DIRECT_URL | Conexão direta usada pelas migrations |
| FRONTEND_URL | Origem permitida pelo CORS |
| PORT | Porta do servidor (definida pela hospedagem em produção) |

## Como executar localmente

```bash
cd controlei-backend
npm install
npx prisma migrate dev
npm run dev
```

O servidor sobe por padrão em `http://localhost:3333`.