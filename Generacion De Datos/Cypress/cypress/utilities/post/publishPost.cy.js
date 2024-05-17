export class PostPublish {
  constructor() {
    this.labelPostside = "a[data-test-nav='posts']";
    this.labelScheduled = "a[data-test-nav-custom='posts-Scheduled']";
    this.labelPublished = "a[data-test-nav-custom='posts-Published']";
    this.labelsTitle = "a.gh-list-data.gh-post-list-title";
    this.publishButton =
      "header > section.gh-editor-publish-buttons > button[data-test-button='publish-flow']";
    this.typePublishButton = "div.gh-publish-setting.last > button";
    this.divSelector = "fieldset > div > div:nth-child(2)";
    this.date = "div:nth-child(1) > input[type=text]";
    this.time = "div:nth-child(2) > input[type=text]";
    this.continueButton = "button[data-test-button='continue']";
    this.publishFinalButton = "button[data-test-button='confirm-publish']";
    this.closeButton = "button[data-test-button='close-publish-flow']";
    this.goBack = "a[data-test-link='posts']";
  }

  visit() {
    cy.get(this.labelPostside).click();
  }

  create(title, date, time) {
    cy.get(this.labelsTitle).contains(title).click();
    cy.get(this.publishButton).click();
    cy.get(this.typePublishButton).click();
    cy.get(this.divSelector).click();
    cy.get(this.date).clear().type(date)
    cy.get(this.time).clear().type(time)
    cy.get(this.continueButton).click();
    cy.get(this.publishFinalButton).click();
    cy.get(this.closeButton).click();
    cy.get(this.goBack).click();
  }

  visitScheduled() {
    cy.get(this.labelScheduled).click();
  }

  visitPublised() {
    cy.get(this.labelPublished).click();
  }

  validate(title) {
    cy.get(this.labelsTitle).contains(title).should("exist");
  }
}
export const postPublish = new PostPublish();
