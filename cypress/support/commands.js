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

Cypress.Commands.add('checkErrors', (failedValidations) => {
    if(failedValidations.length > 0){
        const reportFileName = Cypress.env('reportPath') + Cypress.currentTest.title + '.txt';
        cy.writeFile(reportFileName, failedValidations.join(',\n')).then(() => {
            throw new Error('Se mostraron productos que no cumplen con las validaciones realizadas. Ver reporte en: "' + reportFileName + '"');
        });
    }
});