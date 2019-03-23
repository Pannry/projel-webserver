describe('Teacher didatic content tests', function () {
  beforeEach(function () {
    cy.visit('/professor/login');
    cy.get('input').eq(0).type('p@email.com');
    cy.get('input').eq(1).type('p');
    cy.get('input').contains('Entrar').click();
  });

  it('Should create and delete a class', function () {
    cy.contains('Material didático').click();
    cy.contains('Criar').click();
    cy.contains('Voltar').click();

    cy.contains('Criar').click();
    cy.get('input').eq(0).type(`Material didatico exemplo error`);
    cy.get('input').contains('Criar').click();
    cy.contains('Voltar').click();    

    for (let i = 0; i < 4; i++) {
      cy.contains('Criar').click();
      cy.get('input').eq(0).type(`Material didatico exemplo ${i+1}`);
      cy.get('textarea').eq(0).type('Uma pequena descrição desse exercício exemplo');    
      cy.get('input').contains('Criar').click();     
    }

    cy.contains('Abrir').click();
    cy.contains('Voltar').click();

    cy.contains('Logout').click();
  });

  it('Should delete a class', function () {
    cy.contains('Material didático').click();

    cy.contains('Excluir').click();
    cy.get('#useIdDelete > button').click();
    cy.contains('Logout').click();
  });

});
