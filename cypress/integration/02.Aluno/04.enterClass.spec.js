describe('Student joining in a class', function () {
  before(function () {
    cy.visit('/aluno/login');
    cy.get('input').eq(0).type('a@email.com');
    cy.get('input').eq(1).type('a');
    cy.get('input').contains('Entrar').click();
  });
  it('Should find predefined class', function () {
    cy.contains('Minhas turmas').click();
    cy.contains('Entrar').click();
    
    cy.contains('Logout').click();

  });
});