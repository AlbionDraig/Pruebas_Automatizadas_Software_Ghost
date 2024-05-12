export class TagDelete {
  constructor() {
    this.tagToSelect = "ol.tags-list li.gh-list-row.gh-tags-list-item";
    this.tagToValidate = "section > section";
    this.deleteButton = "//button[contains(@class, 'gh-btn gh-btn-red')]";
    this.confirmButton = "(//button[contains(@class, 'gh-btn gh-btn-red')])[2]";
  }

  visit(url) {
    cy.visit(url+'/ghost/#/tags')
  }

  clickOn(tittle) {
    cy.get(this.tagToSelect).contains(tittle).click();
  }

  delete() {
    cy.xpath(this.deleteButton).click();
  }

  confirm() {
    cy.xpath(this.confirmButton).click();
  }

  validateDeleted(title) {
    cy.get(this.tagToValidate).contains(title).should("not.exist");
  }
}

export const tagDelete = new TagDelete();
