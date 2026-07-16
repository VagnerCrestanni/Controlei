# Rotas da Aplicação

/ -> Login

/create-account -> Cadastro

/forgot-password -> Recuperação de senha

/dashboard -> Dashboard

/controle-financeiro -> Registro de transações


```mermaid
flowchart LR

Login --> Dashboard
Dashboard --> ControleFinanceiro
Dashboard --> Metas
Dashboard --> Graficos
