export class PostDelete {
  constructor() {
    this.validateFields = "a.gh-list-data.gh-post-list-title";
    this.settingsButton = "button[title='Settings']";
    this.deleteButton = "//*[@id='entry-controls']/div/div/div/button | //*[@id='entry-controls']/div/div/form/button";
    this.confirmButton = "button[class='gh-btn gh-btn-red gh-btn-icon ember-view']";
    this.tagToValidate = "section > section";
  }

  visit(url) {
    cy.visit(url+'/ghost/#/posts')
  }

  delete(url,tittle) {
    cy.get(this.validateFields)
      .contains(tittle)
      .click();
    cy.get(this.settingsButton).click();
    cy.xpath(this.deleteButton).click();
    cy.get(this.confirmButton).contains('Delete').click();
    this.visit(url);
  }

  validate(tittle) {
    cy.get(this.tagToValidate).contains(tittle).should("not.exist");
  }
}

export const deletePost = new PostDelete();
