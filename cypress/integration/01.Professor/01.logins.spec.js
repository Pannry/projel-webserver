describe('Teacher login', function() {
  before(function() {
    cy.visit('/professor/login');
  });

  it('Should make login', function() {

    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('p');    
    cy.get('input').contains('Entrar').click();

  });
  it('should make logout', function() {
    cy.contains('Logout').click();
  });
});
