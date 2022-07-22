describe('Добавление карты', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.wait(1000);
    cy.newCard();
  });

  afterEach(() => {
    cy.clearNewCard();
  });

  it('Создание карты', () => {
    // Перейти в список карт, убедиться, что новая карта есть
    cy.get('[data-testid="card-item"]')
      .first()
      .within(() => {
        cy.contains('1234 **** **** 5678').should('exist');
        cy.contains('3 400').should('exist');
      });

    // Проверить, что карта попала в список карт в модале создания транзакции
    // Открыть модал добавления транзакции
    cy.get('[data-testid="add-operation-btn"]').click();
    cy.get('[data-testid="operation-modal"]').within(() => {
      // Найти созданную карту
      cy.get('[data-testid="cardNumber"]').click();
      cy.get('[data-testid="cardNumber-value"]').first().contains('1234 **** **** 5678').should('exist').click();
      // Сохранить
      cy.get('button').contains('Отменить').click();
    });
  });

  it('Редактирование карты', () => {
    // Открыть модал для редактирования карты
    cy.get('[data-testid="card-dropdown-btn"]').first().realHover();
    cy.get('[data-testid="update-card-btn"]').click({ force: true });

    cy.get('[data-testid="card-modal"] [role="dialog"]:visible').within(() => {
      // Проверить изначальные данные
      cy.get('[data-testid="color"][value="blue"]').should('be.checked');
      cy.get('[data-testid="number"]').should('have.value', '1234 **** **** 5678');
      cy.get('[data-testid="balance"]').should('have.value', '3400');
      // Изменить данные
      cy.get('[data-testid="color"][value="pink"]').parents('label').click();
      cy.get('[data-testid="number"]').clear().type('8765432187654321');
      cy.get('[data-testid="balance"]').clear().type('1200');
      // Сохранить
      cy.get('button').contains('Сохранить').click();
    });

    // Проверить, что данные изменились
    // Перейти в список карт, убедиться, что данные изменились
    cy.get('[data-testid="card-item"]')
      .first()
      .within(() => {
        cy.contains('8765 **** **** 4321').should('exist');
        cy.contains('1 200').should('exist');
      });
  });
});
