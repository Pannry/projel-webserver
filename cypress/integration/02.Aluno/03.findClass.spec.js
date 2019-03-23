describe('Student joining in a class', function () {
  before(function () {
    cy.visit('/aluno/login');
    cy.get('input').eq(0).type('a@email.com');
    cy.get('input').eq(1).type('a');
    cy.get('input').contains('Entrar').click();
  });
  
  it('Should find predefined class', function () {
    cy.contains('Procurar por turmas').click();
    cy.get('select').select('1');
    cy.get('input').type('3348193111');
    cy.contains('Procurar sala').click();

    cy.contains('Entrar').click();

  });

  it('Should teacher confirm student requisition', function () {
    cy.exec('npm run db:cr');
  });

});