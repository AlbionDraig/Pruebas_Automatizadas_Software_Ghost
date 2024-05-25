export class CasePageEdit {
  constructor() {
    this.page = "a[data-test-nav=pages]";
    this.items = "a.gh-list-data.gh-post-list-title";
    this.titlePage = "textarea[data-test-editor-title-input]";
    this.contentPage = "div.gh-koenig-editor-pane.flex.flex-column.mih-100 > div:nth-child(3) > div > div > div:nth-child(1) > div";
    this.goBack = "a[data-test-link='pages']";
  }

  visit() {
    cy.get(this.page).click();
  }

  editarPage(title, title2, content2) {
    cy.get(this.items).contains(title).click();
    cy.get(this.titlePage).clear().type(title2);
    cy.get(this.contentPage).clear().type(content2);
    cy.get(this.goBack).click();
  }

  validate(title) {
    cy.get(this.items).contains(title).should("exist");
  }
}
export const casePageEdit = new CasePageEdit();
