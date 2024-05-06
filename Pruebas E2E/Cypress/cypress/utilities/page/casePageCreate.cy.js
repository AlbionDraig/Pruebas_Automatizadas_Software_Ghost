export class CasePagesCreate {
    constructor () {
      this.tagLabelPage = "a[data-test-nav=pages]";
      this.newPageButtonPage = "a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row"; 
      this.tittlePage = "textarea[data-test-editor-title-input]";
      this.contentPage ="p[data-koenig-dnd-droppable=true]";
      this.previewButton = "button[data-test-button=publish-preview]";
    }
    
    visit() {
      cy.get(this.tagLabelPage).click()
    }
  
    create(tittle,content) {

    // pasos para crear la pagina
      cy.get(this.newPageButtonPage).click()
      cy.get(this.tittlePage).type(tittle)
      cy.get(this.contentPage).type(content)        
      cy.get('a[data-test-link="pages"]').click();      


    }

    validate(tittle){

        //pasos para validar la pagina creada
        cy.get('a.gh-list-data.gh-post-list-title').contains(tittle).should('exist');
    }
  
  
  }
  
  export const casePageCreate = new CasePagesCreate();

  visit() {
    cy.get(this.labelPostside).click()
  }

