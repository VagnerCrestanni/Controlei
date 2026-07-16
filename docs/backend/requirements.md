# Objetivo do Backend

O Backend do COntrolei é responsável pela autenticação, gestão de transações, investimentos, mestas e consolidaçãod e dados históricos para dashboards financeiros.

---

## 1. Entidade: Usuário
- Criar conta / Fazer login (JWT).
- Atualizar perfil / Deletar conta.
- Recuperação de senha.

## 2. Entidade: Transação (Receitas/Despesas)
- Criar, Listar, Atualizar e Deletar transações.
- Filtrar por tipo (Entrada/Saída), categoria e competência (mês/ano).

## 3. Entidade: Investimento
- Registrar ativos (Nome, Valor aplicado, Empresa, Data).
- Listar evolução dos investimentos.
- Atualizar ou remover aportes.

## 4. Entidade: Histórico Mensal (Snapshots)
- Gerar fechamento automático do mês.
- Retornar dados consolidados para gráficos de 3, 6 e 12 meses.

## 5. Entidade: Meta
- Criar meta com valor alvo e prazo.
- Listar e atualizar progresso.
-Verificar status (Cumprida/Em andamento).

---

# Requisitos Funcionais (RF) - Projeto Controlei

Este documento detalha as funcionalidades que o backend deve entregar para o usuário final.

---

## 1. Gestão de Acessos e Usuários
* **RF01 - Cadastro de Usuário:** O sistema deve permitir que novos usuários se registrem com nome, e-mail e senha.
* **RF02 - Autenticação:** O sistema deve validar as credenciais e retornar um Token JWT para acesso às rotas protegidas.
* **RF03 - Gestão de Perfil:** O usuário deve poder alterar seus dados cadastrais e trocar de conta (Logoff/login) com segurança.
* **RF04 - Recuperação de Senha:** O sistema deve permitir que o usuário solicite a redefinição de senha via e-mail ou código.

## 2. gestão Financeira (Movimentações)
* **RF05 - Lançamento de Receitas e Despesas:** O usuário deve poder criar, visualizar, editar e excluir registros de ganhos e gastos.
* **RF06 - Gestão de Investimentos:** O sistema deve permitir o registro de ativoa (Ações, CDB, etc.) contendo: nome, valor aplicado, empresa e data.
* **RF07 - Categorização:** O sistema deve permitir vincular cada transação a uma categoria (EX: Moradia, Lazer, Salário).

## 3. Inteligência e Histórico
* **RF08 - Fechamento Mensal Automático:** O sistema deve consolidar os totais de receitas, despesas e investimentos ao final de cada mês e salvar na tabela de Histórico.
* **RF09 - Gráficos de Evolução:** O backend deve fornecer dados formatados para gráficos de 3, 6 e 12 meses, utilizando a tabela de histórico.
* **RF010 - Cálculo de Totais em tempo Real:** O sistema deve retornar o saldo atual, total investido e balanço do mês para exibição no dashboard principal.

## 4. Planejamento de Metas
* **RF11 - Definição de Metas:** O usuário deve poder criar metas financeiras (Ex: "Reserva de Emergência"), definindo um valor alvo e acompanhando o progresso.
* **RF12 - Filtros Temporais:** O usuário deve permitir buscar transaçoes por períodos específicos (mês/ano) para consulta no histórico detalhado.

---

# Requisitos Não Funcionais (RNF) - Projeto Controlei

Este documento descreve as qualidades e restriçoes técnicas do sistema,garantindo a performance, segurança e usabilidade do backend.

---

## 1. Segurança e Privaciade
* **RNF01 - Criptografia de Senhas:** Todas as senhas de usuários devem ser armazenadas utilizando algoritimos de hashing forte (como **BCrypt**) com salt, nunca em texto plano.
* **RNF02 - Autenticação:** O acesso às rotas privadas deve ser protegido via **JWT (JSON Web Token)**.
* **RNF03 - Autorização (Multi-tenancy):** O sistema deve garantir que um usuário nunca consiga acessar, editar ou deletar registros de outro usuário (isolamento por `user_id`).
* **RNF04 - Proteção de Dados:** O sistema deve estar em conformidade com princípios básicos da **LGPD**, permitindo que o usuário solicite a exclusão total de seus dados.

## 2. Performance e Escalabidade
* **RNF05 - Tempo de Resposta:** As consultas de dashboard (totais e saldos) devem responder em menos de **200ms** para garantir uma boa experiência no front-end.
* **RNF06 - Processamento em Lote:** o fechamento mensal (histórico) deve ser processado de forma assíncrona ou em horários de baixo tráfego para não impactar o banco de dados principal.
* **RNF07 - Paginação:** Rotas que retornam listas de transações devem suportar **paginação** para evitar lentidão qunado o usuário tiver muitos registros acumulados.

## 3. Confiabilidade e Disponibilidade
* **RNF08 - Integridade Referencial:** O banco de dados deve utilizar chaves estrangeiras (`Foreing Keys`) para evitar que transações fiquem "órfãs" caso um usuário seja deletado.
* **RNF09 - Disponibilidade:** O backend deve ser projetado para rodar em ambientes de nuvem (como Render, Railway ou AWS) com estratégias de restart automático em caso de falha.
* **RNF10 - Precisão Decimal:** Para cálculos financeiros, o sistema deve utilizar tipos de dados de alta precisão (como `Decimal` ou `Numeric`), evitando erros de arredondamento comuns em tipo `Float`.

## 4. Manutenibilidade e Padrões
* **RNF11 - Arquitetura:** O código deve seguir o padrão **RESTful** para os nomes das rotas e métodos HTTP (`GET`, `POST`, `PUT`,`DELETE`).
* **RNF12 - Documentação:** Todos os endpoints devem ser documentados (Markdown ou Swagger).
* **RNF13 - Logs:** O sistema deve registrar logs de erros críticos para facilitar o debug em ambiente de produção.

## 5. Usabilidade (Interface de API)
* **RNF12 - Mensagens de Erro:** As respostas de erro da API devem ser claras e padronizadas (Ex: código 401 para não autorizado, 400 para erro de validação), facilitando o tratamento no front-end.