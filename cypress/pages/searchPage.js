export class SearchPage {
    //Obtiene el primer valor de checkbox para el título de filtro especificado.
    //Nota: Solo funciona con filtros tipo checkbox
    checkboxFiltersFirstValue(filterTitle){
        return cy.contains(filterTitle).next().find('li').first();
    }
}