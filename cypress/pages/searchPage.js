class SearchPage {
    firstFilterValue(filterTitle){
        return cy.get('[style="grid-area: aggregations;"]').contains(filterTitle).next().find('li').first();
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
    validateAppliedFilter(){
        cy.get('@selectedFilter').then(filter => {
            this.getProductCards()
            .should('have.length.gt', 0).each(product => {
                cy.get(product).should('contain', filter);
            });
        })
    }

    validateAllPagesAppliedFilter(){
        this.obtainLastPageNumber();
        //Itera y valida el filtro aplicado en cada página
        cy.get('@lastPageNumber').then(lastPageNumber => {
            Cypress._.range(0, lastPageNumber).forEach(() => {
                this.validateAppliedFilter();
                this.getNextPaginationButton().click();
            })
        })
    }
}

module.exports = new SearchPage();