export class TagCreate {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.newTagButton = "a.ember-view.gh-btn.gh-btn-primary";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "textarea[name=description][data-test-input=tag-description]";
    this.saveButton = "button[data-test-button=save]";
  }
  
  visit() {
    cy.get(this.tagLabel).click()
  }

  createTag(tagname,color,description) {
    cy.get(this.newTagButton).click()
    cy.get(this.nameField).type(tagname)
    cy.get(this.colorField).type(color)
    cy.get(this.descriptionField).type(description)
    cy.get(this.saveButton).click()
    this.visit()
  }

}

export const tagCreate = new TagCreate();