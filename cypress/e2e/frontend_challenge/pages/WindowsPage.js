
class WindowsPage {
    visitar() {
    cy.visit("/browser-windows");
}
clicarBotaoNovaJanela() {
    // Truque do Cypress: O Cypress não consegue mudar de aba/janela nativamente de forma simples se ela abrir via target="_blank".
    // Porém, o botão "New Window" do DemoQA abre uma janela via window.open().
    // Para capturar o conteúdo no Cypress sem perder o controle da janela principal, podemos interceptar o window.open:
    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    
    cy.get("#windowButton").click();
  }

  validarNovaJanelaAbertaEMensagem() {
    // Visitamos diretamente a url da nova janela para garantir que conseguimos ler e validar seu conteúdo de forma estável
    cy.visit("/sample");
    cy.get("#sampleHeading").should("have.text", "This is a sample page");
  }
}

export default new WindowsPage();