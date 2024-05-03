export class TagDelete {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagToSelect = "ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)";
    this.deleteButton = "button[data-test-button=delete-tag]";
    this.confirmButton = "button[data-test-button=confirm]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  clickOn() {
    cy.get(this.tagToSelect).click()
  }

  delete() {
    cy.get(this.deleteButton).click()
  }

  confirm() {
    cy.get(this.confirmButton).click()
  }

  validateDeleted() {
    cy.get(this.tagToSelect).should('not.exist')
  }

}

export const tagDelete = new TagDelete();