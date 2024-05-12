export class CasePostEdit {
  constructor() {
    this.tagLabelPage = "a[data-test-nav=pages]";
    this.newPageButtonPage =
      "a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row";
    this.tittlePage = "textarea[tabindex='1']";
    this.contentPage = "div[data-koenig-dnd-container='true']";
    this.validateFields = "a.gh-list-data.gh-post-list-title";
  }

  visit(url) {
    cy.visit(url + "/ghost/#/posts");
  }

  editarPost(url, tittle, tittle2, content2) {
    cy.get(this.validateFields).contains(tittle).click();
    cy.get(this.tittlePage).clear().type(tittle2);
    cy.get(this.contentPage).clear().type(content2);
    cy.wait(2000);
    this.visit(url);
    cy.wait(2000);
  }

  validate(tittle) {
    cy.get(this.validateFields).contains(tittle).should("exist");
  }
}
export const casePostEdit = new CasePostEdit();
