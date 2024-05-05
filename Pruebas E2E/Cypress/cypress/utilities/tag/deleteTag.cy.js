export class TagDelete {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagToSelect = "ol.tags-list li.gh-list-row.gh-tags-list-item";
    this.deleteButton = "button[data-test-button=delete-tag]";
    this.confirmButton = "button[data-test-button=confirm]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  clickOn(tittle) {
    cy.get(this.tagToSelect).contains(tittle).click()
  }

  delete() {
    cy.get(this.deleteButton).click()
  }

  confirm() {
    cy.get(this.confirmButton).click()
    cy.get(this.confirmButton).should('not.exist')
  }

  validateDeleted(tittle) {
    cy.get(this.tagToSelect).contains(tittle).should('not.exist')
  }

}

export const tagDelete = new TagDelete();