import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Variáveis globais para armazenar os dados durante a execução do fluxo
let username;
let password;
let userId;
let token;
let booksToRent = [];

Given("que eu crio um novo usuário no sistema com credenciais aleatórias", () => {
  // Gerando credenciais únicas usando o timestamp atual para evitar erros de usuário já existente
  const uniqueId = Date.now();
  username = `user_accenture_${uniqueId}`;
  password = `Accenture@${uniqueId}`; // Exige maiúscula, minúscula, número e caractere especial

  cy.request({
    method: "POST",
    url: "/Account/v1/User",
    failOnStatusCode: false, // Evita que o teste quebre abruptamente para podermos validar o status
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(201); // Valida que o usuário foi criado com sucesso
    expect(response.body).to.have.property("userID");
    userId = response.body.userID; // Salva o ID do usuário para os próximos passos
  });
});

Given("eu gero um token de acesso válido", () => {
  cy.request({
    method: "POST",
    url: "/Account/v1/GenerateToken",
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.status).to.eq("Success");
    token = response.body.token; // Salva o token de acesso
  });
});

When("eu confirmo se o usuário está devidamente autorizado", () => {
  cy.request({
    method: "POST",
    url: "/Account/v1/Authorized",
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.eq(true); // O retorno deve ser explicitamente verdadeiro (true)
  });
});

When("eu escolho dois livros disponíveis na biblioteca", () => {
  cy.request({
    method: "GET",
    url: "/BookStore/v1/Books"
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.books).to.have.length.of.at.least(2);
    
    // Captura o identificador (ISBN) dos dois primeiros livros retornados pela API
    booksToRent.push(response.body.books[0].isbn);
    booksToRent.push(response.body.books[1].isbn);
  });
});

When("eu realizo o aluguel desses dois livros escolhidos", () => {
  cy.request({
    method: "POST",
    url: "/BookStore/v1/Books",
    headers: {
      Authorization: `Bearer ${token}` // Passando o token gerado no Header
    },
    body: {
      userId: userId,
      collectionOfIsbns: [
        { isbn: booksToRent[0] },
        { isbn: booksToRent[1] }
      ]
    }
  }).then((response) => {
    expect(response.status).to.eq(201); // Valida que a reserva/aluguel foi criada
  });
});

Then("eu valido que os detalhes do usuário listam exatamente os livros alugados", () => {
  cy.request({
    method: "GET",
    url: `/Account/v1/User/${userId}`,
    headers: {
      Authorization: `Bearer ${token}` // Autenticação obrigatória para ver dados do perfil
    }
  }).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body.username).to.eq(username);
    
    // Validação final: extrai os ISBNs que estão vinculados ao usuário
    const rentedIsbnsInProfile = response.body.books.map(book => book.isbn);
    
    // Garante que ambos os livros que escolhemos estão listados no perfil do usuário
    expect(rentedIsbnsInProfile).to.include(booksToRent[0]);
    expect(rentedIsbnsInProfile).to.include(booksToRent[1]);
  });
});
