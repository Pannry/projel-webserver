describe('Student Sidebar menu', function () {
  before(function () {
    cy.visit('/aluno/login');
    cy.get('input').eq(0).type('a@email.com');
    cy.get('input').eq(1).type('a');
    cy.get('input').contains('Entrar').click();
  });
  
  it('Should pass through sidebar menu', function () {
    cy.contains('Perfil').click();
    cy.contains('Minhas turmas').click();
    cy.contains('Procurar por turmas').click();
    cy.contains('Logout').click();
  });
});