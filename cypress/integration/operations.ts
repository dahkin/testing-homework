describe('Добавление операции', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.wait(1000);

    cy.newCard();
    cy.newTransaction();
  });

  afterEach(() => {
    cy.clearNewCard();
    cy.clearNewTransaction();
  });

  it('Создание транзакции', () => {
    // Перейти в список транзакций, убедиться, что новая транзакция есть
    cy.get('[data-testid="history-item"]')
      .first()
      .within(() => {
        cy.contains('Название').should('exist');
        cy.contains('34').should('exist');
        cy.contains('1234 **** **** 5678').should('exist');
      });
  });

  it('Редактирование транзакции', () => {
    // Открыть модал для редактирования транзакции
    cy.get('[data-testid="operation-dropdown-btn"]').first().realHover();
    cy.get('[data-testid="update-operation-btn"]').click({ force: true });

    cy.get('[data-testid="operation-modal"] [role="dialog"]:visible').within(() => {
      // Проверить изначальные данные
      cy.get('[data-testid="type"][value="income"]').should('be.checked');
      cy.get('[data-testid="name"]').should('have.value', 'Название');
      cy.get('[data-testid="cardNumber"] .ant-select-selection-item').contains('1234 **** **** 5678').should('exist');
      cy.get('[data-testid="value"]').should('have.value', '34');
      // Изменить данные
      cy.get('[data-testid="type"][value="expense"]').parents('label').click();
      cy.get('[data-testid="name"]').clear().type('Название новое');
      cy.get('[data-testid="value"]').clear().type('1200');
      // Сохранить
      cy.get('button').contains('Сохранить').click();
    });

    // Проверить, что данные изменились
    // Перейти в список транзакций, убедиться, что данные изменились
    cy.get('[data-testid="history-item"]')
      .first()
      .within(() => {
        cy.contains('Название новое').should('exist');
        cy.contains('1 200').should('exist');
      });
  });
});
