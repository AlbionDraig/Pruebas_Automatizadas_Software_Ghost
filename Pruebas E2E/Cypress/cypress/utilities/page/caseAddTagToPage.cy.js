export class CaseAddTagToPage{

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

      addTagToPage(tittle, tagName){

        cy.get('a.gh-list-data.gh-post-list-title')
        .contains(tittle)
        .trigger('contextmenu')
        .then(($element) => {
            cy.get('button[class="mr2"]')
            .contains('Add a tag')
            .click({ force: true });
            
            cy.get('[class="ember-power-select-trigger-multiple-input"]').click();
            cy.get('li.ember-power-select-option').contains(tagName).first().click();
            cy.get('button[data-test-button="confirm"]').click();
         });
      }

      validate(tagName){
        
        cy.get('a.gh-content-entry-author').contains(tagName).should('exist');
      }
}

export const caseAddTagToPage = new CaseAddTagToPage();