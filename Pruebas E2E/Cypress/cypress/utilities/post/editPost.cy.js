export class CasePostEdit {
  constructor() {
    this.tagLabelPost = "a[data-test-nav=posts]";
    this.newPostButtonPost =
      "a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row";
    this.tittlePost = "textarea[data-test-editor-title-input]";
    this.contentPost = "p[data-koenig-dnd-droppable=true]";
    this.previewButton = "button[data-test-button=publish-preview]";
  }

  visit() {
    cy.get(this.tagLabelPost).click();
  }

  editarPost(tittle, tittle2, content2) {
    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(tittle)
      .should("exist");
    cy.get("a.gh-list-data.gh-post-list-title").contains(tittle).click();
    cy.get(this.tittlePost).clear().type(tittle2);
    cy.get(this.contentPost).clear().type(content2);
    cy.get('a[href="#/posts/"][data-test-link=posts]').click();

    cy.get("a.gh-list-data.gh-post-list-title")
      .contains(tittle2)
      .should("exist");
  }

  validate(title) {
    cy.get("a.gh-list-data.gh-post-list-title").contains(title).should("exist");
  }
}
export const casePostEdit = new CasePostEdit();
