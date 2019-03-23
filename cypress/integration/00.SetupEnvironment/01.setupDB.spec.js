describe('Resetando o banco de dados.', function() {
  it('Should reset database', function() {
    cy.exec('npm run db:reset');
    cy.exec('npm run db:tables');
    cy.exec('npm run db:places');
  });

  it('Teacher should make signup', function() {
    cy.visit(Cypress.env('TSECRET'));

    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(1).type('professor exemplo');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(2).type('p');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(3).type(34578912356);
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(4).type('Av. Dr. Silas Munguba, Fortaleza - CE');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(5).type(1700);
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(6).type(60740000);
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(7).type(8531019601);
    cy.get('input').contains('Cadastrar').click();

    cy.contains('Logout').click();
  });

  it('Student should make signup', function() {
    cy.visit('/aluno/signup');

    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(0).type('aluno exemplo');
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(1).type('a@email.com');    
    cy.get('input').contains('Cadastrar').click();

    cy.get('input').eq(2).type('a');    
    cy.get('input').contains('Cadastrar').click();

    cy.contains('Logout').click();
  });
});