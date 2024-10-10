export class HeaderPage {
    searchInput() {
        return cy.get('[style="grid-area:search"] [name="keyword"]');
    }
    searchBtn(){
        return cy.get('[style="grid-area:search"] [type="submit"]')
    }

    
    //Realiza una búsqueda en la página web con el término de búsqueda proporcionado. 
    makeSearch(term){
        this.searchInput().type(term);
        this.searchBtn().click();
    }
}