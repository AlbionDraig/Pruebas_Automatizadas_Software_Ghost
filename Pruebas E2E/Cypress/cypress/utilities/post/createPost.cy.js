export class PostCreate {
  constructor() {
    this.labelPostside = "a[data-test-nav=new-story]";
    this.titlePost = "textarea[data-test-editor-title-input]";
    this.textPost = "p[data-koenig-dnd-droppable=true]";
    this.publishPostUp ="button[data-test-button=publish-flow]";
    this.finalReviewPost = "button[data-test-button=continue]";
    this.publishPostNow = "button[data-test-button=confirm-publish]";
    this.backDashboard = "a.ember-view.gh-back-to-editor";
    this.verifyPost="a.gh-list-data.gh-post-list-title";
  }
 //   this.saveButton = "button[data-test-button=save]";


   // this.newPostButtonUp = "a.ember-view.gh-btn.gh-btn-primary";
   // this.postImagePost = "a.ember-view.gh-editor-feature-image-unsplash";
   // this.buttonImagenPost = "a.gh-unsplash-button";

  //  gh-btn gh-btn-editor darkgrey gh-publish-trigger

//    gh-btn gh-btn-editor darkgrey gh-publish-trigger/
  visit() {
    cy.get(this.labelPostside).click();
  }

  create(title, textPost) {
    // cy.get(this.bottonPostUp).click()
  //  cy.get(this.postImagePost).click();
   // cy.get(this.buttonImagenPost).click();
    cy.get(this.titlePost).type(title);
    cy.get(this.textPost).type(title);
    cy.get(this.publishPostUp).click();
    cy.get(this.finalReviewPost).click();
    cy.get(this.publishPostNow).click();
    cy.get(this.backDashboard).click();
  }

  validate(title) {
          cy.get(this.verifyPost).contains(title).should('not.exist');       
 }
 
}
export const postCreate = new PostCreate();
