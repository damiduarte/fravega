import { HeaderPage } from "../pages/headerPage"
import { SearchPage } from "../pages/searchPage"

const headerPage = new HeaderPage();
const searchPage = new SearchPage();

describe('template spec', () => {
  it.only('passes', () => {
    cy.visit('/');

    cy.closePopup();
    headerPage.makeSearch('heladeras');
    searchPage.checkboxFiltersFirstValue('Marca').click();
  })
})