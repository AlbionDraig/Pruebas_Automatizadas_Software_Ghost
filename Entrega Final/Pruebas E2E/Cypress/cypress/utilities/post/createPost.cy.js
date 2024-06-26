export class PostCreate {
  constructor() {
    this.page = "a[data-test-nav=posts]";
    this.newButton = "a.ember-view.gh-btn.gh-btn-primary"
    this.items = "a.gh-list-data.gh-post-list-title";
    this.titlePage = "textarea[data-test-editor-title-input]";
    this.contentPage = "div.gh-koenig-editor-pane.flex.flex-column.mih-100 > div:nth-child(3) > div > div > div:nth-child(1) > div";
    this.goBack = "a[data-test-link='posts']";
  }

  visit() {
    cy.get(this.page).click();
  }

  create(title, content) {
    cy.get(this.newButton).click();
    cy.get(this.titlePage).type(title);
    cy.get(this.contentPage).type(content);
    cy.wait(5000)
    cy.get(this.goBack).click();
  }

  validate(tittle) {
    cy.get(this.items).contains(tittle).should("exist");
  }
}
export const postCreate = new PostCreate();
