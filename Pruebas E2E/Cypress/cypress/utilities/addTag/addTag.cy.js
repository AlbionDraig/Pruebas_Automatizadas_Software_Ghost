export class AddTag {
  constructor() {
    this.tagLabelPage = "a[data-test-nav=pages]";
    this.tagLabelPost = "a[data-test-nav=posts]";
    this.elementToSelect = "a.gh-list-data.gh-post-list-title";
    this.menu = "button[class='mr2']";
    this.selectTag = "[class='ember-power-select-trigger-multiple-input']";
    this.tagName = "li.ember-power-select-option";
    this.addButton = "button[data-test-button='confirm']";
    this.tagContent = ".gh-content-entry-meta";
  }
 
  visitPage() {
    cy.get(this.tagLabelPage).click();
  }

  visitPosts() {
    cy.get(this.tagLabelPost).click();
  }

  addTag(tittle, name) {
    cy.get(this.elementToSelect)
      .contains(tittle)
      .trigger("contextmenu")
      .then(($element) => {
        cy.get(this.menu)
          .contains("Add a tag")
          .click({ force: true });
        cy.get(this.selectTag).click();
        cy.get(this.tagName).contains(name).first().click();
        cy.get(this.addButton).click();
      });
  }

  validate(name) {
    cy.contains(this.tagContent, name).should("exist");
  }
}

export const addTag = new AddTag();
