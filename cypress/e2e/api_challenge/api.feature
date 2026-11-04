# language: pt

Funcionalidade: Desafio de Automação de API - Livraria DemoQA
Cenário: Fluxo completo de criação de usuário e aluguel de livros
    Dado que eu crio um novo usuário no sistema com credenciais aleatórias
    E eu gero um token de acesso válido
    Quando eu confirmo se o usuário está devidamente autorizado
    E eu escolho dois livros disponíveis na biblioteca
    E eu realizo o aluguel desses dois livros escolhidos
    Então eu valido que os detalhes do usuário listam exatamente os livros alugados
