export class TagCreate {
  constructor () {
    this.newTagButton = "a.ember-view.gh-btn.gh-btn-primary";
    this.tagToValidate = "section > section";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "//textarea[@name='description']";
    this.saveButton = "//button[contains(@class, 'gh-btn-icon ember-view')]";
  }
  
  visit(url) {
    cy.visit(url+'/ghost/#/tags')
  }
  
  createTag(url,tagname,color,description) {
    cy.wait(2000)
    cy.visit(url+'/ghost/#/tags/new')
    cy.wait(2000)
    cy.get(this.nameField).type(tagname)
    cy.get(this.colorField).type(color)
    cy.xpath(this.descriptionField).type(description)
    cy.xpath(this.saveButton).click()
    cy.wait(2000)
    this.visit(url)
    cy.wait(2000)
  }

  validate(title) {
    cy.get(this.tagToValidate).contains(title).should("exist");
  }

}

export const tagCreate = new TagCreate();