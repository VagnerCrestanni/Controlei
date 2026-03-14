# Busines-rules (Regras- de Negócio)

1. **Isolamento de Dados:** Um usuario nunca pode acessar, editar ou deletar dados de outro usuário. Toda consulta deve filtrar pelo `user_ID`extraído do Token JWT.
2. **Integridade de Transação:** Toda transação ou investimento deve estar obrigatóriamente vinculado a um usuário ativo.
3. **Segurança de Credenciais:** Senhas devem ser armazenadas exclusivamente em formato Hash (BCrypt).
4. **Unicidade de Identidade:** Não é permitido o cadastro de dois usuários com o mesmo e-mail.
5. **Validação devalores:** O valor de transações e investimentos deve ser sempre maior que zero.
6. **Consistência do Histórico:** O registro de histórico mensal é imutável após a criação para garantir a precisão dos gráficos retroativos.
7. **Temporalidade de Metas:** A data final de uma meta deve ser obrigatóriamnete maior que a data da criação.