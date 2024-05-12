export class Search {
  constructor() {
    this.searchDiv = "button.gh-nav-btn-search";
    this.searchInput = "(//div/div[1]/div/div/div[1]/input)[1]";
    this.selectLi = "li > ul > li:nth-child(1)";
    this.searchLabel = "(//main/section/header/h2 | //main//section//h1)[1]";
  }

  visit(url) {
    cy.visit(url + "/ghost/#/site");
  }

  search(text) {
    cy.get(this.searchDiv).click();
    cy.xpath(this.searchInput).type(text);
    cy.wait(5000)
    cy.get(this.selectLi).contains(text).click();
    cy.wait(5000)
  }

  validate() {
    cy.xpath(this.searchLabel).should("exist");
  }
}

export const search = new Search();
