export class MenberDelete {
  constructor () {
    this.tagLabel = "a[data-test-nav=members]";
    this.nameLabel = "a[data-test-table-data=details] > div > div > h3";
    this.actionsButton = "button[data-test-button=member-actions]";
    this.deleteButton = "button[data-test-button=delete-member]";
    this.validateButton = "button[data-test-button=confirm]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  delete() {
    cy.get(this.nameLabel).click()
    cy.get(this.actionsButton).click()
    cy.get(this.deleteButton).click()
    cy.get(this.validateButton).click()
    this.visit()
  }

  validate() {
    cy.get(this.nameLabel).should('not.exist')
  }

}

export const memberDelete = new MenberDelete();