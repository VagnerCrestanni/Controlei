# Modelagem do Banco de Dados (ERD)

Este diagrama representa a estrutura de tabelas e os relacionamentos do sistema *Controlei*.

```mermaid
erDiagram
    USERS ||--o{ TRANSACTIONS : "possui"
    USERS ||--o{ INVESTMENTS : "gerencia"
    USERS ||--o{ GOALS : "define"
    USERS ||--o{ MONTHLY_HISTORY : "visualiza"

    USERS {
        uuid id PK
        string nome
        string email UK
        string senha_hash
        datetime criado_em
    }

    TRANSACTIONS {
        uuid id PK
        uuid user_id FK
        string descricao
        decimal valor
        string tipo "income / expense"
        string categoria
        date data
    }

    INVESTMENTS {
        uuid id PK
        uuid user_id FK
        string nome
        decimal valor_aplicado
        string empresa
        date data_aplicacao
    }

    GOALS {
        uuid id PK
        uuid user_id FK
        string nome
        decimal valor_alvo
        decimal valor_atual
        date prazo
    }

    MONTHLY_HISTORY {
        uuid id PK
        uuid user_id FK
        int mes
        int ano
        decimal total_receitas
        decimal total_despesas
        decimal total_investido
        decimal saldo_final
    }