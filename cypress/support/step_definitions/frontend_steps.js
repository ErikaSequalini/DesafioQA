
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import FormPage from "../../e2e/frontend_challenge/pages/FormPage.js";
import WindowsPage from "../../e2e/frontend_challenge/pages/WindowsPage.js";
import TablesPage from "../../e2e/frontend_challenge/pages/TablesPage.js";
import ProgressBarPage from "../../e2e/frontend_challenge/pages/ProgressBarPage.js";
import SortablePage from "../../e2e/frontend_challenge/pages/SortablePage.js";

// ==========================================
// PASSOS DO CENÁRIO A (FORMULÁRIO)
// ==========================================
Given("que eu acesso a página de formulário do DemoQA", () => {
  FormPage.visitar();
});

When("eu preencho os dados do estudante com valores aleatórios", () => {
  const uniqueId = Date.now().toString().slice(-10);
  FormPage.preencherDadosPessoais("Teste", "Accenture", `estudante_${uniqueId}@provedor.com`, uniqueId);
  FormPage.preencherEndereco("Avenida Paulista, 1000 - São Paulo");
});

When("seleciono o gênero {string} e o hobby {string}", (genero, hobby) => {
  FormPage.selecionarGenero(genero);
  FormPage.selecionarHobby(hobby);
});

When("realizo o upload de um arquivo de texto válido", () => {
  //Alterando para buscar dentro da pasta fixtures
  FormPage.fazerUploadArquivo("cypress/fixtures/exemplo.txt");
});

When("envio o formulário preenchido", () => {
  FormPage.enviarFormulario();
});

Then("eu valido que o modal de confirmação foi aberto com sucesso", () => {
  FormPage.validarModalVisivel();
});

Then("fecho o modal após a validação", () => {
  FormPage.fecharModal();
});

// ==========================================
// PASSOS DO CENÁRIO B (JANELAS)
// ==========================================
Given("que eu acesso a página de Browser Windows do DemoQA", () => {
  WindowsPage.visitar();
});

When("eu clico no botão para abrir uma nova janela", () => {
  WindowsPage.clicarBotaoNovaJanela();
});

Then("eu confirmo que a nova janela abre exibindo a mensagem {string}", (mensagem) => {
  WindowsPage.validarNovaJanelaAbertaEMensagem();
});

// ==========================================
// PASSOS DO CENÁRIO C (TABELAS)
// ==========================================
Given("que eu acesso a página de Web Tables do DemoQA", () => {
  TablesPage.visitar();
});

When("eu crio um novo registro na tabela", () => {
  TablesPage.criarRegistro("Jose", "Silva", "jose@test.com", "30", "5000", "TI");
});

When("eu edito esse registro recém criado alterando o nome", () => {
  TablesPage.editarUltimoRegistro("Jose Alterado");
});

Then("eu deleto o registro e limpo a tabela", () => {
  TablesPage.deletarRegistroCriado();
});

// ==========================================
// PASSOS DO BÔNUS (12 REGISTROS DINÂMICOS)
// ==========================================
When("eu crio 12 registros de forma automatizada", () => {
  for (let i = 1; i <= 12; i++) {
    TablesPage.criarRegistro(`Estudante${i}`, `Sobrenome${i}`, `user${i}@accenture.com`, "25", "3000", "QA");
  }
});

Then("eu limpo a tabela excluindo todos os registros dinâmicos", () => {
  TablesPage.deletarTodosOsRegistrosDinamicos();
});

// ==========================================
// PASSOS DO CENÁRIO D (BARRA DE PROGRESSO)
// ==========================================
Given("que eu acesso a página de Progress Bar do DemoQA", () => {
  ProgressBarPage.visitar();
});

When("eu inicio a barra de progresso e a interrompo antes dos 25%", () => {
  ProgressBarPage.clicarIniciarOuParar();
  ProgressBarPage.esperarAtePorcentagemMenorQue25();
});

Then("eu valido que o progresso atual é menor ou igual a 25%", () => {
  ProgressBarPage.validarValorMenorOuIgualA25();
});

Then("eu retomo a barra até 100% para realizar o reset do componente", () => {
  ProgressBarPage.esperarChegarA100EResetar();
  ProgressBarPage.validarBarraResetada();
});

// ==========================================
// PASSOS DO CENÁRIO E (ORDENAÇÃO)
// ==========================================
Given("que eu acesso a página de Sortable do DemoQA", () => {
  SortablePage.visitar();
});

When("eu ordeno os elementos em ordem crescente de {string} a {string}", (de, para) => {
  SortablePage.ordenarListaCrescente();
});

Then("eu valido que a lista está perfeitamente ordenada", () => {
  SortablePage.validarOrdemCorreta();
});
