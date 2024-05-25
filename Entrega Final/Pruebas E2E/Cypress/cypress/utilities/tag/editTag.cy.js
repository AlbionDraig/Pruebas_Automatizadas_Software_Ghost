export class TagEdit {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagButton = "ol.tags-list li.gh-list-row.gh-tags-list-item";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "textarea[name=description][data-test-input=tag-description]";
    this.saveButton = "button[data-test-button=save]";
    this.tagToValidate = "section > section";
    this.error = "span > p:nth-child(2)";
    this.accept = "div.modal-footer > button.gh-btn.gh-btn-red";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  edit(oldTagName,tagName,color,description) {
    cy.get(this.tagButton).contains(oldTagName).click()
    cy.get(this.nameField).clear().type(tagName)
    cy.get(this.colorField).clear().type(color)
    cy.get(this.descriptionField).clear().type(description)
    cy.get(this.saveButton).click()
    cy.wait(5000)
  }

  acceptChanges() {
    cy.get(this.accept).click();
  }

  validate(title) {
    cy.get(this.tagToValidate).contains(title).should("exist");
  }

  validateError() {
    cy.get(this.error).should("be.visible");
  }

}

export const tagEdit = new TagEdit();