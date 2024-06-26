export class TagEdit {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagButton = "ol.tags-list li.gh-list-row.gh-tags-list-item";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "textarea[name=description][data-test-input=tag-description]";
    this.saveButton = "button[data-test-button=save]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  editTag(oldTagName,tagName,color,description) {
    cy.get(this.tagButton).contains(oldTagName).click()
    cy.get(this.nameField).clear().type(tagName)
    cy.get(this.colorField).clear().type(color)
    cy.get(this.descriptionField).clear().type(description)
    cy.get(this.saveButton).click()
    this.visit()
  }

  validateEdited(tagName) {
    cy.get(this.tagButton).contains(tagName);
  }

}

export const tagEdit = new TagEdit();