export class CasePagesCreate {
  constructor() {
    this.titlePage = "textarea[tabindex='1']";
    this.contentPage = "div[data-koenig-dnd-container='true']";
    this.validateFields = "a.gh-list-data.gh-post-list-title";
  }

  visit(url) {
    cy.visit(url + "/ghost/#/pages");
  }

  create(url, title, content) {
    cy.wait(2000);
    cy.visit(url + "/ghost/#/editor/page");
    cy.wait(2000);
    cy.get(this.titlePage).type(title);
    cy.get(this.contentPage).type(content);
    cy.wait(2000);
    this.visit(url);
    cy.wait(2000);
  }

  validate(title) {
    cy.get(this.validateFields).contains(title).should("exist");
  }
}

export const casePageCreate = new CasePagesCreate();
