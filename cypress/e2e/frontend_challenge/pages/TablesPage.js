
class TablesPage {
  visitar() {
    cy.visit("/webtables");
    // Simplificado de forma definitiva: como só existe um dropdown na tela, pegamos ele diretamente!
    cy.get("select", { timeout: 10000 }).select("20", { force: true });
  }

  criarRegistro(nome, sobrenome, email, idade, salario, departamento) {
    cy.get("#addNewRecordButton").click({ force: true });
    cy.get("#firstName").should("be.visible").type(nome);
    cy.get("#lastName").type(sobrenome);
    cy.get("#userEmail").type(email);
    cy.get("#age").type(idade);
    cy.get("#salary").type(salario);
    cy.get("#department").type(departamento);
    cy.get("#submit").click({ force: true });
  }

  editarUltimoRegistro(novoNome) {
    cy.get("[id^=edit-record-4]").click({ force: true });
    cy.get("#firstName").clear().type(novoNome);
    cy.get("#submit").click({ force: true });
  }

  deletarRegistroCriado() {
    cy.get("[id^=delete-record-4]").click({ force: true });
  }

  deletarTodosOsRegistrosDinamicos() {
    // Deleta os 12 registros de forma limpa e sequencial
    for (let i = 0; i < 12; i++) {
      cy.get("[id^=delete-record]").first().click({ force: true });
      cy.wait(150); // Pausa milimétrica para a animação da tabela processar a exclusão
    }
  }
}

export default new TablesPage();
