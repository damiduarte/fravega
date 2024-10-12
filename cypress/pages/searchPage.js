const failedValidations = [];
class SearchPage {
    firstFilterValue(filterTitle){
        return cy.get('[style^="grid-area: aggregations"]').contains(filterTitle).next().find('li').first();
    }
    
    getProductCards(){
        return cy.get('[data-test-id="result-item"]');
    }

    getNextPaginationButton(){
        return cy.get('[data-test-id="pagination-next-button"]');
    }

    getLastPaginationNumber(){
        return cy.get('[data-type="page"]').last();
    }
    
    obtainLastPageNumber(){
        this.getLastPaginationNumber().invoke('text').as('lastPageNumber');
    }

    //Obtiene el primer elemento de checkbox para el título de filtro especificado y guarda su nombre en un alias.
    //Nota: Solo funciona con filtros tipo checkbox
    getCheckboxFiltersFirstValue(filterTitle){
        this.firstFilterValue(filterTitle).invoke('text').then(filterValue => {
            //Elimina el texto que indica la cantidad de productos que cumplen con el filtro
            const quantityIndex = filterValue.indexOf('(');
            filterValue = filterValue.slice(0, quantityIndex - 1);
            cy.wrap(filterValue).as('selectedFilter');
        });
        return this.firstFilterValue(filterTitle);
    }

    
    //Valida que el filtro aplicado esté presente en todos los productos mostrados en la página actual.
    //Se utiliza en la función 'validateAllPagesAppliedFilter'
    validateAppliedFilter(filter){
        this.getProductCards()
        .should('have.length.gt', 0).each(product => {
            try {
                expect(product).to.contain(filter);
            } catch (error) {
                let productTitle = product[0].innerText
                productTitle = productTitle.slice(0, productTitle.indexOf('\n'));
                failedValidations.push(productTitle);
            }
        });
    }

    validateAllPagesAppliedFilter(){
        this.obtainLastPageNumber();
        //Itera por cada página y valida el filtro aplicado en cada producto
        Cypress.Promise.all([
            cy.get('@lastPageNumber'),
            cy.get('@selectedFilter')
        ]).then(([lastPageNumber, filter]) => {
            Cypress._.range(0, lastPageNumber - 1).forEach(() => {
                this.validateAppliedFilter(filter);
                this.getNextPaginationButton().click();
            })
        })
        cy.wrap(failedValidations).as('failedValidations');
    }
}

module.exports = new SearchPage();