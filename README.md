# 🚀 Desafio Técnico QA Automation Engineer - Accenture

Este repositório contém a resolução do desafio técnico de automação de testes para a Accenture. O projeto engloba a automação completa de fluxos de **Back-end (API)** e **Front-end (Web)** utilizando o site *DemoQA* como aplicação sob teste.

## 🏗️ Arquitetura e Tecnologias Utilizadas

Para garantir a escalabilidade, manutenibilidade e legibilidade do projeto, a estrutura foi desenvolvida utilizando as seguintes tecnologias e padrões:

*   **Ferramenta de Teste:** [Cypress](https://cypress.io) (v13+) - Escolhido pela sua rapidez e capacidade de unificar testes de API e Interface na mesma stack.
*   **Linguagem:** JavaScript (ES6+ em formato de Módulos).
*   **Abordagem de Desenvolvimento:** **BDD (Behavior-Driven Development)** via Cucumber (Gherkin), permitindo cenários funcionais escritos em português e legíveis para a área de negócios.
*   **Padrão de Projeto:** **Page Objects Pattern (PoP)** - Utilizado na automação frontend para separar os seletores e interações dos elementos da página da lógica de execução dos testes.

---

## 📑 Estrutura do Projeto

```unset
desafio-qa-accenture/
  ├── cypress/
  │    ├── e2e/
  │    │    └── frontend_challenge/
  │    │         └── pages/               # Page Objects (Elementos e ações visuais)
  │    │              ├── FormPage.js
  │    │              ├── ProgressBarPage.js
  │    │              ├── SortablePage.js
  │    │              ├── TablesPage.js
  │    │              └── WindowsPage.js
  │    ├── fixtures/
  │    │    └── exemplo.txt              # Massa de dados para Upload de arquivo
  │    ├── support/
  │    │    ├── step_definitions/        # Implementação dos passos dos testes (JS)
  │    │    │    ├── api_steps.js
  │    │    │    └── frontend_steps.js
  │    │    └── e2e.js
  ├── cypress.config.js                  # Configurações do Cypress e plugins do Cucumber
  ├── package.json                       # Dependências e scripts do projeto
  └── README.md                          # Documentação do projeto
```

---

## 🛠️ Cenários Automatizados

### 📡 Parte 1: Automação de API (Back-end)
Fluxo de ponta a ponta executado de forma contínua e encadeada (`api.feature`):
1.  **POST** `/Account/v1/User`: Criação de usuário dinâmico (com geração de credenciais únicas usando timestamp).
2.  **POST** `/Account/v1/GenerateToken`: Geração de Token de acesso.
3.  **POST** `/Account/v1/Authorized`: Validação de autorização do usuário.
4.  **GET** `/BookStore/v1/Books`: Consulta ao catálogo e captura de ISBNs de dois livros.
5.  **POST** `/BookStore/v1/Books`: Aluguel dos dois livros passando autenticação *Bearer Token* no Header.
6.  **GET** `/Account/v1/User/{userID}`: Validação final garantindo que os livros alugados constam no perfil do usuário.

### 🎨 Parte 2: Elementos Visuais (Front-end)
Interações completas na interface web (`frontend.feature`):
*   **Cenário A (Forms):** Preenchimento de dados aleatórios, upload de arquivo `.txt` local de forma nativa e validação/fechamento do modal de confirmação.
*   **Cenário B (Alerts, Frame & Windows):** Manipulação de janelas do navegador simulando foco controlado na página secundária para asserção de texto.
*   **Cenário C (Web Tables):** Fluxo de CRUD (Criação, Edição e Exclusão) de registros na tabela.
*   **⭐ CENÁRIO BÔNUS:** Inserção dinâmica e automatizada de **12 registros simultâneos**, tratamento de paginação fluida expandindo a exibição para 20 linhas e loop sequencial para exclusão total de dados sem impactos de concorrência.
*   **Cenário D (Widgets - Progress Bar):** Sincronismo dinâmico (*Conditional Wait*) interrompendo a barra rigorosamente antes dos 25%, validação do estado lógico e posterior conclusão até 100% com reset do componente.
*   **Cenário E (Interactions - Sortable):** Validação visual da ordenação sequencial de elementos de lista.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
*   [Node.js](https://nodejs.org) instalado (Versão LTS recomendada).

### Passo a Passo

1. Clonar o repositório do GitHub:
   ```bash
   git clone <link-do-seu-repositorio>
   cd desafio-qa-accenture
   ```

2. Instalar as dependências do projeto:
   ```bash
   npm install
   ```

3. Abrir a interface gráfica do Cypress para execução visual:
   ```bash
   npx cypress open
   ```
   *Após abrir a tela do Cypress, selecione **E2E Testing**, escolha o navegador de preferência e clique em cima de `api.feature` ou `frontend.feature` para rodar.*

4. Caso prefira rodar os testes em modo oculto (*headless*) direto no terminal:
   ```bash
   npx cypress run
   ```

---
Desenvolvido com foco em alta cobertura, estabilidade frente a componentes assíncronos e aderência estrita aos padrões arquiteturais do mercado.
