export class CasePageEdit {
  constructor() {
    this.tagLabelPage = "a[data-test-nav=pages]";
    this.newPageButtonPage =
      "a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row";
    this.tittlePage = "textarea[data-test-editor-title-input]";
    this.contentPage = "p[data-koenig-dnd-droppable=true]";
    this.previewButton = "button[data-test-button=publish-preview]";
  }

  visit() {
    cy.get(this.tagLabelPage).click();
  }

  editarPage(tittle, tittle2, content2) {
    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(tittle)
      .should("exist");
    cy.get("a.gh-list-data.gh-post-list-title").contains(tittle).click();
    cy.get(this.tittlePage).clear().type(tittle2);
    cy.get(this.contentPage).clear().type(content2);
    cy.get('a[data-test-link="pages"]').click();

    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(tittle2)
      .should("exist");
  }

  validate(title){
    cy.get('a.gh-list-data.gh-post-list-title').contains(title).should('exist');
  }
}
export const casePageEdit = new CasePageEdit();
