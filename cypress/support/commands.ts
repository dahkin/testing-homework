// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute with timeout per ms
     * @example cy.dataCy('greeting', { timeout: 50000 })
     */
    newCard(): Chainable<Element>;
    clearNewCard(): Chainable<Element>;
    newTransaction(): Chainable<Element>;
    clearNewTransaction(): Chainable<Element>;
  }
}

Cypress.Commands.add('newCard', () => {
  // Добавить тестовую карту
  // Открыть модал добавления карты
  cy.get('[data-testid="add-card-btn"]').click();
  cy.get('[data-testid="card-modal"]').within(() => {
    // Выбрать цвет
    cy.get('[data-testid="color"][value="blue"]').parents('label').click();
    // Ввести номер карты
    cy.get('[data-testid="number"]').type('1234567812345678');
    // Ввести баланс
    cy.get('[data-testid="balance"]').type('3400');
    // Сохранить
    cy.get('button').contains('Сохранить').click();
  });
  cy.wait(1000);
});

Cypress.Commands.add('clearNewCard', () => {
  // Удалить тестовую карту
  cy.get('[data-testid="card-dropdown-btn"]').first().realHover();
  cy.get('[data-testid="delete-card-btn"]').click({ force: true });
  cy.get('button').contains('Удалить').click();
  cy.wait(1000);
});

Cypress.Commands.add('newTransaction', () => {
  // Добавить тестовую транзакцию
  // Открыть модал добавления транзакции
  cy.get('[data-testid="add-operation-btn"]').click();
  cy.get('[data-testid="operation-modal"]').within(() => {
    // Выбрать тип
    cy.get('[data-testid="type"][value="income"]').parents('label').click();
    // Ввести название
    cy.get('[data-testid="name"]').type('Название');
    // Выбрать карту
    cy.get('[data-testid="cardNumber"]').click();
    cy.get('[data-testid="cardNumber-value"]').first().click();
    // Ввести сумму
    cy.get('[data-testid="value"]').type('34');
    // Сохранить
    cy.get('button').contains('Сохранить').click();
  });
  cy.wait(1000);
});

Cypress.Commands.add('clearNewTransaction', () => {
  // Удалить новую транзакцию
  cy.get('[data-testid="operation-dropdown-btn"]').first().realHover();
  cy.get('[data-testid="delete-operation-btn"]').click({ force: true });
  cy.get('button').contains('Удалить').click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
