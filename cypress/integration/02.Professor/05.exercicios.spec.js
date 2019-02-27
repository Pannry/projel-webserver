describe('Exercises tests', function () {
  beforeEach(function () {
    cy.visit('/professor/login');
    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('p');
    cy.get('input').contains('Entrar').click();
  });

  it('Should create an exercise', function () {
    cy.contains('Exercícios').click();
    cy.contains('Criar').click();
    cy.contains('Voltar').click();

    cy.contains('Exercícios').click();

    cy.contains('Criar').click();
    cy.get('input').contains('Criar').click();
    cy.get('input').eq(0).type(`material exemplo error`);
    cy.contains('Voltar').click();


    for (let i = 0; i < 4; i++) {
      cy.contains('Criar').click();
      cy.get('input').eq(0).type(`material exemplo ${i + 1}`);
      cy.get('textarea').eq(0).type('Uma pequena descrição desse material exemplo');
      cy.get('input').contains('Criar').click();
    }

    cy.contains('Abrir').click();
    cy.contains('Voltar').click();

    cy.contains('Logout').click();
  });

  it('Should delete a exercise', function () {
    cy.contains('Exercícios').click();

    cy.contains('Excluir').click();
    cy.get('#useIdDelete > button').click();
    cy.contains('Logout').click();
  });

});
