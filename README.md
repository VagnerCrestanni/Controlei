
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

**Controlei** surgiu a partir da dificuldade de muitas pessoas em visualizar para onde o dinheiro está indo ao longo dos meses. O Controlei surgiu para transformar dados financeiros em informações claras e visuais, facilitando decisões financeiras no dia a dia.

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
    * **Fastfy**: Framework web para a criação das rotas e da API.
    * **PostgreSQL**: Banco de dados relacional para o armazenamento dos dados.

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

---

## ✅ Funcionalidades Atuais

As seguintes funcionalidades já estão implementadas e totalmente estilizadas para desktop e mobile:

* **Registro de Transações:** Adicionar rendas, despesas e investimentos, com campos para valor, data, entidade e pessoa responsável.
* **Dashboard em Tempo Real:** Visualização dinâmica dos valores no dashboard principal.
* **Gráfico de Dashboard:** Gráfico de linha interativo para acompahar seu dinheiro nos ultimos 3, 6 e 12 meses.
* **Definição de Metas:** Adicionar metas de renda, despesa e investimento, com datas de expiração personalizáveis.
* **Histórico Financeiro:** Análise completa do histórico financeiro, com visualização anual e detalhamento mensal com gráfico completo.

---

## 🛣️ Roadmap de Evolução

As próximas etapas do projeto estão planejadas para transformar o **Controlei** em uma aplicação completa com backend e persistência de dados:

### 🔹 Backend
* Criação de API REST com **Node.js**
* Estruturação de rotas para receitas, despesas, investimentos e metas
* Separação de camadas (controllers, services e repositories)

### 🔹 Autenticação
* Sistema de login e cadastro de usuários
* Autenticação via **JWT**
* Proteção de rotas privadas

### 🔹 Banco de Dados
* Persistência de dados em banco relacional (PostgreSQL)
* Modelagem das entidades financeiras
* Integração com ORM

### 🔹 Evoluções Futuras
* Relatórios mais avançados
* Comparação entre períodos
* Exportação de dados

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


