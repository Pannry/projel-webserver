describe('Classroom tests', function () {
  beforeEach(function () {
    cy.visit('/professor/login');
    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('p');
    cy.get('input').contains('Entrar').click();
  });

  it('Should create a class', function () {
    cy.contains('Minhas turmas').click();
    cy.contains('Criar').click();
    cy.contains('Voltar').click();

    cy.contains('Minhas turmas').click();
    cy.contains('Criar').click();

    cy.get('input').eq(0).type('Estrutura de dados');
    cy.get('input').eq(1).type('2018.2');    
    cy.get('input').contains('Criar').click();

    cy.contains('Logout').click();
  });

  it('Should delete a class', function () {
    cy.contains('Minhas turmas').click();

    cy.contains('Excluir').click();
    cy.get('#useIdDelete > button').click();
    cy.contains('Logout').click();
  });
});
