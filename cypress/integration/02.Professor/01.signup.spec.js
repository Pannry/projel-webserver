describe('Teacher signup', function() {
  before(function() {
    cy.visit('/professor/signup');
  });

  it('Should make signup', function() {

    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('professor exemplo');
    cy.get('input').eq(2).type('p');
    cy.get('input').eq(3).type(34578912356);
    cy.get('input').eq(4).type('Av. Dr. Silas Munguba, Fortaleza - CE');
    cy.get('input').eq(5).type(1700);
    cy.get('input').eq(6).type(60740000);
    cy.get('input').eq(7).type(8531019601);
    cy.get('input').contains('Cadastrar').click();

  });
  it('should make logout', function() {
    cy.contains('Logout').click();
  });
});
