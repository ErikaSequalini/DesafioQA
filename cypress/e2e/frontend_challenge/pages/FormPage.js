
class FormPage {
  visitar() {
    cy.visit("/automation-practice-form");
  }

  preencherDadosPessoais(nome, sobrenome, email, celular) {
    cy.get("#firstName").type(nome);
    cy.get("#lastName").type(sobrenome);
    cy.get("#userEmail").type(email);
    cy.get("#userNumber").type(celular);
  }

  selecionarGenero(genero) {
    cy.contains("label", genero).click();
  }

  selecionarHobby(hobby) {
    cy.contains("label", hobby).click();
  }

  fazerUploadArquivo(caminhoArquivo) {
    cy.get("#uploadPicture").selectFile(caminhoArquivo);
  }

  preencherEndereco(endereco) {
    cy.get("#currentAddress").type(endereco);
  }

  enviarFormulario() {
    cy.get("#submit").click({ force: true });
  }

  validarModalVisivel() {
    cy.get(".modal-content").should("be.visible");
    cy.get("#example-modal-sizes-title-lg").should("have.text", "Thanks for submitting the form");
  }

  fecharModal() {
    cy.get("#closeLargeModal").click({ force: true });
  }
}

export default new FormPage();
