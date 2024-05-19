export class CasePublishPage {
    constructor() {
      this.page = "a[data-test-nav=pages]";
      this.newPageButtonPage = "a.ember-view.gh-btn.gh-btn-primary"
      this.items = "a.gh-list-data.gh-post-list-title";
      this.titlePage = "textarea[data-test-editor-title-input]";
      this.contentPage = "div.gh-koenig-editor-pane.flex.flex-column.mih-100 > div:nth-child(3) > div > div > div:nth-child(1) > div";
      this.goBack = "a[data-test-link='pages']";
      this.confirmarPublish="button[data-test-button='confirm-publish']";
      this.continuePublish=".gh-publish-cta button[data-test-button='continue']";
      this.confirmarUnpublish ="button.gh-revert-to-draft[data-test-button='revert-to-draft']";
    }

    visit() {
        cy.get(this.page).click();
    }

    create(title, content) {
        cy.get(this.newPageButtonPage).click();
        cy.get(this.titlePage).type(title);
        cy.get(this.contentPage).type(content);
    }

    publishPage(){
        cy.contains('button', 'Publish')
        .should('be.visible') // Verifica que el botón de vista previa esté visible
        .click();
        cy.wait(1000);
        cy.get(this.continuePublish).click();
        cy.wait(1000);
        cy.get(this.confirmarPublish).click();
        cy.wait(1000);
        cy.get('a.gh-back-to-editor[href="#/dashboard/"]')
        .should('be.visible')
        .click();
    }
    
    intoPage(tittle){
        cy.get(this.items).contains(tittle).click();
    }
    
    unpublishPage(){
        cy.contains('button', 'Unpublish')
        .should('be.visible') // Verifica que el botón de vista previa esté visible
        .click();
        cy.get(this.confirmarUnpublish).should('be.visible').click();
        cy.wait(1000);
        cy.get(this.goBack).click();
        cy.wait(1000);
    }
}
export const casePublishPage = new CasePublishPage();