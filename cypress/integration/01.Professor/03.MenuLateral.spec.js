describe('Sidebar menu', function () {
  before(function () {
    cy.visit('/professor/login');
    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('p');
    cy.get('input').contains('Entrar').click();
  });

  it('Should pass through sidebar menu', function () {
    cy.contains('Perfil').click();
    cy.contains('Minhas turmas').click();
    cy.contains('Exercícios').click();
    cy.contains('Lista de atividades').click();
    cy.contains('Material didático').click();
    cy.contains('Logout').click();
  });

});
