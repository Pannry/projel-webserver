describe('Student login', function() {
  before(function() {
    cy.visit('/aluno/login');
  });

  it('Should make login', function() {

    cy.get('input').eq(0).type('a');
    cy.get('input').eq(1).type('a');    
    cy.get('input').contains('Entrar').click();

  });
  it('should make logout', function() {
    cy.contains('Logout').click();
  });
});
