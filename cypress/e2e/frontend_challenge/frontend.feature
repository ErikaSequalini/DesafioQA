
# language: pt
Funcionalidade: Desafio de Automação Frontend - Interface DemoQA

  Cenário: Cenário A - Preenchimento com sucesso do formulário de estudante
    Dado que eu acesso a página de formulário do DemoQA
    Quando eu preencho os dados do estudante com valores aleatórios
    E seleciono o gênero "Male" e o hobby "Sports"
    E realizo o upload de um arquivo de texto válido
    E envio o formulário preenchido
    Então eu valido que o modal de confirmação foi aberto com sucesso
    E fecho o modal após a validação

  Cenário: Cenário B - Validação de Nova Janela do Navegador
    Dado que eu acesso a página de Browser Windows do DemoQA
    Quando eu clico no botão para abrir uma nova janela
    Então eu confirmo que a nova janela abre exibindo a mensagem "This is a sample page"

  Cenário: Cenário C - Criação, Edição e Exclusão de Registro em Tabelas
    Dado que eu acesso a página de Web Tables do DemoQA
    Quando eu crio um novo registro na tabela
    E eu edito esse registro recém criado alterando o nome
    Então eu deleto o registro e limpo a tabela

  Cenário: BÔNUS - Inserção Dinâmica de 12 registros via Cucumber
    Dado que eu acesso a página de Web Tables do DemoQA
    Quando eu crio 12 registros de forma automatizada
    Então eu limpo a tabela excluindo todos os registros dinâmicos

  Cenário: Cenário D - Controle e Manipulação da Barra de Progresso
    Dado que eu acesso a página de Progress Bar do DemoQA
    Quando eu inicio a barra de progresso e a interrompo antes dos 25%
    Então eu valido que o progresso atual é menor ou igual a 25%
    E eu retomo a barra até 100% para realizar o reset do componente

  Cenário: Cenário E - Ordenação Crescente via Drag and Drop
    Dado que eu acesso a página de Sortable do DemoQA
    Quando eu ordeno os elementos em ordem crescente de "One" a "Six"
    Então eu valido que a lista está perfeitamente ordenada
