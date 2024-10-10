//Agregar contenedor anterior a contains
const searchPage = require('../pages/searchPage.js');
const headerPage = require('../pages/headerPage.js');

const searchTerm = 'heladeras';
const filterTitle = 'Marca';

describe('Search', () => {
  it('Buscar heladeras, filtrar por primer marca de filtros y validar filtro aplicado', () => {
    cy.visit('/');

    cy.closePopup();
    headerPage.makeSearch(searchTerm);
    searchPage.getCheckboxFiltersFirstValue(filterTitle).click();
    searchPage.validateAllPagesAppliedFilter();
  })
})