describe('Resetando o banco de dados.', function() {
  it('Should reset database', function() {
    cy.exec('npm run db:reset');
    cy.exec('npm run db:tables');
    cy.exec('npm run db:places');
  });
});