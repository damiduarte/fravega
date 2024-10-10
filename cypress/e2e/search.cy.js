//Agregar contenedor anterior a contains
const searchPage = require('../pages/searchPage.js');
const headerPage = require('../pages/headerPage.js');
const searchTerm = data.searchTerm;
import data from '../fixtures/data.json';

describe('Search', () => {
  it('Buscar heladeras, filtrar por primer marca de filtros y validar filtro aplicado', () => {
    const filterTitle = 'Marca';
    cy.visit('/');

    cy.closePopup();
    headerPage.makeSearch(searchTerm);
    searchPage.getCheckboxFiltersFirstValue(filterTitle).click();
    searchPage.validateAllPagesAppliedFilter();
  })
})