# Componentes do Frontend

## Login

Responsável pela autenticação do usuário.

Campos:

- email
- senha

---

## CreateAccount

Responsável pela criação de novas contas.

Campos:

- nome
- email
- senha

---

## ForgotPassword

Permite solicitar recuperação de senha.

---

## Dashboard

Apresenta:

- resumo financeiro
- metas
- gráficos

---

## ControleFinanceiro

Responsável por registrar:

- receitas
- despesas
- investimentos

---

## CardFinancialControl

Componente responsável por exibir cada transação.

```mermaid
graph TD

App --> Login
App --> CreateAccount
App --> ForgotPassword
App --> Dashboard
App --> ControleFinanceiro

Dashboard --> CardDashboard
ControleFinanceiro --> CardFinancialControl
