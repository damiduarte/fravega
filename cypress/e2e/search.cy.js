import { HeaderPage } from "../pages/headerPage"
const headerPage = new HeaderPage();

describe('template spec', () => {
  it.only('passes', () => {
    cy.visit('/');

    cy.closePopup();
    headerPage.makeSearch('heladeras');
  })
})