export class TagEdit {
  constructor () {
    this.tagLabel = "a[data-test-nav=tags]";
    this.tagButton = "ol.tags-list li.gh-list-row.gh-tags-list-item";
    this.nameField = "#tag-name";
    this.colorField = "input[name=accent-color][type=text]";
    this.descriptionField = "//textarea[@name='description']";
    this.saveButton = "//button[contains(@class, 'gh-btn-icon ember-view')]";
    this.scroll = "main.gh-main > section > form";
  }
  
  visit(url) {
    cy.visit(url+'/ghost/#/tags')
  }

  editTag(url,oldTagName,tagName,color,description) {
    cy.wait(2000)
    cy.visit(url+'/ghost/#/tags/'+oldTagName.toLowerCase())
    cy.wait(2000)
    cy.get(this.nameField).clear().type(tagName, { force: true })
    cy.get(this.colorField).clear().type(color, { force: true })
    cy.xpath(this.descriptionField).clear().type(description, { force: true })
    cy.xpath(this.saveButton).click()
    cy.wait(2000)
    this.visit(url)
    cy.wait(2000)
  }

  validateEdited(tagName) {
    cy.get(this.tagButton).contains(tagName);
  }

}

export const tagEdit = new TagEdit();