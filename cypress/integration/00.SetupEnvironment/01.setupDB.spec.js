describe('Resetando o banco de dados.', function() {
  it('Should reset database', function() {
    cy.exec('npm run db:reset && npm run db:populate');
  });
});