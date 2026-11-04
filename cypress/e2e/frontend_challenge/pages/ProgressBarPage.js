
class ProgressBarPage {
  visitar() {
    cy.visit("/progress-bar");
  }

  clicarIniciarOuParar() {
    cy.get("#startStopButton").click({ force: true });
  }

  esperarAtePorcentagemMenorQue25() {
    cy.get(".progress-bar", { timeout: 15000 }).should(($el) => {
      const text = $el.text();
      const value = parseInt(text.replace("%", ""), 10);
      expect(value).to.be.at.least(15);
    });
    this.clicarIniciarOuParar();
  }

  validarValorMenorOuIgualA25() {
    cy.get(".progress-bar").then(($el) => {
      const text = $el.text();
      const value = parseInt(text.replace("%", ""), 10);
      expect(value).to.be.lessThan(26);
    });
  }

  esperarChegarA100EResetar() {
    cy.get("#startStopButton").then(($btn) => {
      if ($btn.text().includes("Start")) {
        this.clicarIniciarOuParar();
      }
    });

    // Espera a barra chegar a 100% com folga no tempo
    cy.get(".progress-bar", { timeout: 30000 }).should("have.text", "100%");
    
    // Pequena pausa estratégica de meio segundo para o botão mudar fisicamente para Reset no site
    cy.wait(500);
    
    // Clica no botão de Reset garantindo que ele está visível
    cy.get("#resetButton", { timeout: 10000 }).should("be.visible").click({ force: true });
  }

  validarBarraResetada() {
    // Dá um tempo confortável para a animação do site zerar a barra
    cy.get(".progress-bar", { timeout: 10000 }).should("have.text", "0%");
  }
}

export default new ProgressBarPage();
