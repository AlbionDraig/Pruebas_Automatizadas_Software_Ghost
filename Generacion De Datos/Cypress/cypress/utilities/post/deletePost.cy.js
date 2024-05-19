export class PostDelete {
  constructor() {
    this.page = "a[data-test-nav=posts]";
    this.items = "a.gh-list-data.gh-post-list-title";
    this.settingsBtn = "button[title='Settings']";
    this.deleteBtn = "button.gh-btn.gh-btn-outline.gh-btn-icon.gh-btn-fullwidth";
    this.confirm = "button.gh-btn.gh-btn-red.gh-btn-icon.ember-view";
    this.tagToValidate = "section > section";
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
    cy.get(this.tagToValidate).contains(tittle).should("not.exist");
  }
}

export const deletePost = new PostDelete();
