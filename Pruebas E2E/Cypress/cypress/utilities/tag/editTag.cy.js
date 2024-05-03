export class TagEdit {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagButton = "ol.tags-list li.gh-list-row.gh-tags-list-item:nth-of-type(3)";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "textarea[name=description][data-test-input=tag-description]";
    this.saveButton = "button[data-test-button=save]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  editTag(tagname,color,description) {
    cy.get(this.tagButton).click()
    cy.get(this.nameField).clear().type(tagname)
    cy.get(this.colorField).clear()
    cy.get(this.colorField).type(color)
    cy.get(this.descriptionField).clear().type(description)
    cy.get(this.saveButton).click()
    this.visit()
  }

  validateEdited(tagName) {
    cy.get(this.tagButton)
    .invoke('text')
    .then(text => {
      if (!text.includes(tagName)) {
        throw new Error(`El texto no contiene ${tagName}`);
      }
    });
  }

}

export const tagEdit = new TagEdit();