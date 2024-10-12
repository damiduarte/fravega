const searchPage = require('../pages/searchPage.js');
const headerPage = require('../pages/headerPage.js');
const reportPath = 'cypress/reports/';
var reportFileName;

describe('Search', () => {
  beforeEach(() => {
    cy.visit('/');
    reportFileName = reportPath + this.test.title + '.txt';
  })

  it('Buscar heladeras, filtrar por primer marca de filtros y validar filtro aplicado', () => {
    const filterTitle = 'Marca';
    cy.closePopup();

    headerPage.makeSearch('heladeras');
    searchPage.getCheckboxFiltersFirstValue(filterTitle).click();
    searchPage.validateAllPagesAppliedFilter();
  })

  afterEach(() => {
    cy.checkErrors(reportFileName);
  })
})