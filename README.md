
# 💸 Controlei - App de Controle Financeiro

<p align="center">
  Um aplicativo de gestão financeira para ajudar você a ter controle total sobre sua renda, despesas e investimentos.
</p>

---

## 📅 Status do Projeto

<div align="center">
  
![Status](https://img.shields.io/badge/status-MVP%20funcional%20em%20evolu%C3%A7%C3%A3o-green)

</div>

O projeto está em fase de desenvolvimento contínuo e será atualizado com novos recursos nas próximas semanas. Acompanhe os commits e as novas funcionalidades!
* **Acesse o projeto online:** [controlei-sigma.vercel.app/](https://controlei-sigma.vercel.app/)

---

## 🧠 Sobre o Projeto

**Controlei** surgiu a partir de uma dificuldade familiar em visualizar para onde o dinheiro está indo ao longo dos meses. O Controlei surgiu para transformar dados financeiros em informações claras e visuais, facilitando decisões financeiras no dia a dia, com opções de aidionar renda, despesas e investimentos.

O app é ideal para usuários iniciantes e intermediários que desejam um controle total sobre suas finanças. Ele permite:

* **Rastreamento financeiro:** Acompanhe sua renda, despesas e investimentos com metas, gráficos e valores separados por categoria, para uma visão clara de suas finanças mensais.
* **Registro fácil:** Insira valores de renda, despesas e investimentos, com a opção de registrar a pessoa, a entidade e a data da transação.
* **Análises completas:** Visualize análises financeiras mensais, semestrais e anuais para entender seus hábitos de consumo.
* **Histórico detalhado:** Acesse todo o seu histórico financeiro desde o primeiro registro.
* **Design intuitivo:** Uma interface simples e limpa, adaptável para **desktop e mobile**.

---

## 🛠 Tecnologias Utilizadas

O projeto está sendo desenvolvido com o seguinte conjunto de tecnologias e ferramentas:

* **Frontend:**
    * **React.js**: Biblioteca para construção da interface de usuário.
    * **JavaScript (ES6+)**: Lógica e manipulação dos dados.
    * **CSS / Tailwind**: Estilização e design responsivo.
    * **Vite**: Ambiente de desenvolvimento rápido.

* **Backend:**
    * **Node.js**: Ambiente de execução para o servidor.
    * **Fastify**: Framework web para a criação das rotas e da API.
    * **PostgreSQL**: Banco de dados relacional para o armazenamento dos dados.
    * **Prisma ORM**: Mapeamento objeto-relacional para comunicação com o banco de dados.
    * **Zod**: Validação de dados nas requisições da API.

* **Banco de Dados:**
    * **PostgreSQL**: banco relacional escolhido por três motivos:
        * **Dados naturalmente relacionais:** usuários, transações e metas se conectam por chaves (`userId`), e o modelo relacional representa e consulta isso de forma direta.
        * **Integridade dos dados financeiros:** o suporte a transações ACID garante que uma operação é gravada por inteiro ou não é gravada, o que importa quando se lida com valores em dinheiro.
        * **Boa integração com o ecossistema:** funciona bem com o Prisma ORM, tem suporte nativo a tipos como enum e datas (usados em `TransactionType` e nos filtros por mês e ano) e possui opções de hospedagem gratuita, como o Neon.

* **Outras Ferramentas:**
    * **Git & GitHub**: Controle de versão e colaboração.

---

## 🧩 Principais Desafios Técnicos

Durante o desenvolvimento do **Controlei**, alguns desafios técnicos importantes foram enfrentados, contribuindo diretamente para meu aprendizado prático:

* **Organização e reutilização de dados financeiros:** Estruturação de dados fictícios e dinâmicos para suportar visualizações mensais, semestrais e anuais.
* **Separação de responsabilidades:** Divisão clara entre componentes responsáveis pela lógica (ex: `Dashboard.jsx`) e componentes responsáveis apenas pela visualização dos dados (ex: `DashboardGraph.jsx`).
* **Manipulação de estruturas complexas em JavaScript:** Uso intensivo de `Object.keys`, `Object.entries`, `map`, `reduce`, `flatMap` e filtros por período.
* **Gráficos dinâmicos e interativos:** Implementação de gráficos de linha que se adaptam aos períodos selecionados (3, 6 e 12 meses).
* **Preparação para backend:** Organização do código pensando na futura integração com banco de dados e backend em Node.js, evitando acoplamento excessivo entre lógica e interface.
 **Arquitetura pensada para evolução:** O projeto foi estruturado para facilitar a futura integração com backend e banco de dados, mantendo a lógica de cálculo desacoplada da interface.
* **Organização da API:** API organizada entre pastas para facil implementação e manutenção, pensando na produção e sua manutenabilidade. 
* **Banco de Dados com segurança:** Criação com testes de validação e de segurança para compor uma estrutura segura para o usuario final.
* **Interatividade Instantanea:**  comunicação entre banco de dados e frontend de forma fluida e instantanea sem recarregar pagina a cada nova transação.

---

## 📚 Principais Aprendizados

O desenvolvimento deste projeto proporcionou aprendizados importantes, especialmente para minha evolução como desenvolvedor:

* Organização e gerenciamento de **estados complexos** no React.
* Desenvolvimento do **pensamento lógico** para transformar dados financeiros em informações visuais claras.
* Aplicação de **boas práticas de componentização** e reutilização de código.
* Estruturação de um projeto real **do zero até uma versão funcional**, lidando com dificuldades reais do processo.
* Maior compreensão sobre como planejar funcionalidades pensando na **escalabilidade futura** da aplicação.
* Estruturação de uma **API organizada e funcional** em Node.js para conectar o front-end ao banco de dados.
* Implementação de **validação de dados robusta com Zod** para garantir a segurança e integridade das requisições.
* Integração entre Frontend React e Backend em Node.js, consumindo dados reais do banco através de uma API REST.
* Utilização de filtragem de mes e ano utilizando **gte e lt no Prisma** para que cada mes mostre apenas suas transações;
* Utilização do hook useEffect do React para ter comunicação entre banco de dados e frontend de forma instantanea sem precisar recarregar a pagina a cada nova transação inserida.

* Diferença entre **autenticação** (confirmar quem é o usuário) e **autorização** (definir o que ele pode acessar), aplicada ao filtrar todas as consultas pelo usuário logado.
* Armazenamento seguro de senhas com **hash (bcrypt)**, entendendo por que o hash é irreversível e criptografia não.
* Uso de **JWT com expiração curta** para limitar o estrago caso um token seja roubado, e de um hook `onRequest` no Fastify para proteger as rotas em um único lugar.
* Testes manuais de isolamento de dados entre dois usuários, confirmando que um não enxerga as transações do outro.
* Análise dos trade-offs de segurança ao guardar o token no `localStorage` e decisão consciente de não implementar refresh token neste projeto.

---

## 📦 Como Executar o Projeto

Se você deseja explorar o código ou rodar em sua máquina, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [(https://github.com/VagnerCrestanni/Controlei.git)]
    ```

2.  **Acesse a pasta do projeto:**
    ```bash
    cd Controlei/Controlei/vite-project
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

5.  **Acesse no navegador:**
    O aplicativo estará disponível em `http://localhost:5173`.
    ```

### Backend
1. **Acesse a pasta do backend:**
```bash
   cd Controlei/controlei-backend
```

2. **Instale as dependências:**
```bash
   npm install
```

3. **Configure o arquivo `.env` com sua `DATABASE_URL`**

4. **Execute as migrations:**
```bash
   npx prisma migrate dev
```

5. **Inicie o servidor:**
```bash
   npm run dev
```
---

## ✅ Funcionalidades Atuais

As seguintes funcionalidades já estão implementadas e totalmente estilizadas para desktop e mobile:

* **Registro de Transações:** Adicionar rendas, despesas e investimentos, com campos para valor, data, entidade e pessoa responsável.
* **Dashboard em Tempo Real:** Visualização dinâmica dos valores no dashboard principal.
* **Gráfico de Dashboard:** Gráfico de linha interativo para acompahar seu dinheiro nos ultimos 3, 6 e 12 meses.
* **Definição de Metas:** Adicionar metas de renda, despesa e investimento, com datas de expiração personalizáveis.
* **Histórico Financeiro:** Análise completa do histórico financeiro, com visualização anual e detalhamento mensal com gráfico completo.
* **Dados reais salvo em Banco:** Persistência de dados em PostgreSQL com Prisma ORM, garantindo que as informações não se percam entre sessões.

* **Cadastro e Autenticação de Usuário:**
    * Cadastro com validação dos dados (Zod) e senha protegida por hash (bcrypt), nunca armazenada em texto puro.
    * Login com token JWT de curta duração (2 horas).
    * Proteção contra tentativas repetidas: após 5 erros de senha, o login fica bloqueado por 30 minutos.
    * Rotas de transações e metas protegidas: sem token válido, a API recusa a requisição.
    * Isolamento de dados: cada usuário acessa apenas as próprias transações e metas.

---

### 🔹 Evoluções Futuras
* Relatórios mais avançados onde no histórico o usuario poderá visualizar em que usou o dinheiro e não apenas o valor.
* Função de excluir uma transação ou meta.
* Função de editar uma transação ou meta.
* Função que mostra se a meta está sendo batida ou não.
* Comparação entre períodos.
* Exportação de dados.
* Modo de tela escuro.
* botão de configurações da conta.
* Histórico de metas com grafico para o usuario ver se está cumprindo todas as metas.

---

## 🤝 Como Contribuir

Contribuições são muito bem-vindas! Se você deseja ajudar a melhorar o projeto, corrigir bugs ou sugerir novas funcionalidades, siga o fluxo de contribuição padrão:

1.  Faça um **fork** do projeto.
2.  Crie uma nova branch para sua feature:
    ```bash
    git checkout -b minha-melhoria
    ```
3.  Faça suas alterações e adicione-as ao staging:
    ```bash
    git add .
    ```
4.  Faça o **commit** com uma mensagem descritiva:
    ```bash
    git commit -m "feat: adiciona nova funcionalidade"
    ```
5.  Envie suas alterações para o seu fork:
    ```bash
    git push origin minha-melhoria
    ```
6.  Abra um **Pull Request** para a branch `main` do projeto original.

---

## 📫 Contato

* **E-mail:** [vagnerdcrestanni@gmail.com](mailto:vagnerdcrestanni@gmail.com)
* **LinkedIn:** [linkedin.com/in/vagner-crestanni](https://www.linkedin.com/in/vagner-crestanni-331a87309/)
* **Telefone:** +55 46 98803-3230

Feito com ❤️ por **Vagner Crestanni** - Engenheiro de Software em formação.


