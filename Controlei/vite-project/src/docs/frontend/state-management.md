# Gerenciamento de Estado

O estado da aplicação é gerenciado utilizando:

- React useState
- Props

Fluxo de dados:

Parent Component
↓
Props
↓
Child Component

Exemplo:

ControleFinanceiro
↓
CardFinancialControl


```mermaid
flowchart TD

ControleFinanceiro -->|props| CardFinancialControl
CardFinancialControl -->|evento| ControleFinanceiro
ControleFinanceiro --> Dashboard
