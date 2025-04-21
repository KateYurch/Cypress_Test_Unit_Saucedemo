/// <reference types="cypress" />

it('google search', () => {
  cy.visit('https://google.com/')
  cy.get('#APjFqb').type("Cypress Tutorials")
  cy.contains('Google Search').click()
})