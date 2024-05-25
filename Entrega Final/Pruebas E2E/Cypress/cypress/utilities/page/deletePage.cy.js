export class CasePageDelete {
  constructor() {
    this.page = "a[data-test-nav=pages]";
    this.items = "a.gh-list-data.gh-post-list-title";
    this.settingsBtn = "button[title='Settings']";
    this.deleteBtn = "button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth";
    this.confirm = "button.gh-btn.gh-btn-red.gh-btn-icon.ember-view";
    this.goBack = "a[data-test-link='pages']";
  }

  visit() {
    cy.get(this.page).click();
  }

  delete(title) {
    cy.get(this.items).contains(title).click();
    cy.get(this.settingsBtn).click();
    cy.get(this.deleteBtn).click();
    cy.get(this.confirm).click();
    cy.wait(5000);
  }

  validate(tittle) {
    cy.get("section > section")
      .contains(tittle)
      .should("not.exist");
  }

  goBackPage(){
    cy.get(this.settingsBtn).click();
    cy.get(this.goBack).click();    
  }
}

export const casePageDelete = new CasePageDelete();
