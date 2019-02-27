describe('Student signup', function() {
  before(function() {
    cy.visit('/aluno/signup');
  });

  it('Should make signup', function() {

    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(0).type('aluno exemplo');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(1).type('a@email.com');    
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(2).type('a');    
    cy.get('input').contains('Cadastrar').click();

  });
  it('should make logout', function() {
    cy.contains('Logout').click();
  });
});
