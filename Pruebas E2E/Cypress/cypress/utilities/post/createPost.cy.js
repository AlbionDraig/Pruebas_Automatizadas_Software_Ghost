export class PostCreate {
  constructor() {
    this.labelPostside = "a[data-test-nav=new-story]";
    this.titlePost = "textarea[data-test-editor-title-input]";
    this.textPost = "p[data-koenig-dnd-droppable=true]";
    this.publishPostUp = 'a[data-test-link="posts"]';
    this.finalReviewPost = "button[data-test-button=continue]";
    this.publishPostNow = "button[data-test-button=confirm-publish]";
    this.backDashboard = "a.ember-view.gh-back-to-editor";
    this.verifyPost = "a.gh-list-data.gh-post-list-title";
  }

  visit() {
    cy.get(this.labelPostside).click();
  }

  create(title, textPost) {
    cy.get(this.titlePost).type(title);
    cy.get(this.textPost).type(title);
    cy.get(this.publishPostUp).click();
  }

  validate(title) {
    cy.get(this.verifyPost).contains(title).should('exist');
  }
}
export const postCreate = new PostCreate();
