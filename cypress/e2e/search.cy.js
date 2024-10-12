const searchPage = require('../pages/searchPage.js');
const headerPage = require('../pages/headerPage.js');
const reportPath = 'cypress/reports/';
let reportFileName;

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

  afterEach(() => {
    reportFileName = reportPath + Cypress.currentTest.title + '.txt';
    cy.checkErrors(reportFileName);
  })
})