const searchPage = require('../pages/searchPage.js');
const headerPage = require('../pages/headerPage.js');

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
  })

  it('Buscar heladeras, filtrar por primer marca de filtros y validar filtro aplicado', () => {
    cy.closePopup();
    headerPage.makeSearch('heladeras');

    const filterTitle = 'Marca';
    searchPage.getCheckboxFiltersFirstValue(filterTitle).click();
    searchPage.validateAllPagesAppliedFilter();
  })
})