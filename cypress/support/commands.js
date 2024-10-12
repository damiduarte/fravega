// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('closePopup', () => {
    cy.get('[data-test-id="close-modal-button"]').click();
});

Cypress.Commands.add('checkErrors', (reportPath) => {
    //Valido si se creó el alias failed validations antes de obtenerlo ya que si no falla
    const failedValidations = cy.state('aliases')?.failedValidations != undefined;
    if(failedValidations){
        cy.get('@failedValidations').then(failedValidations => {
            cy.writeFile(reportPath, failedValidations.join(',\n')).then(() => {
                throw new Error('Se mostraron productos que no cumplen con las validaciones realizadas. Ver reporte en: ' + reportPath);
            });
        })
    }
});