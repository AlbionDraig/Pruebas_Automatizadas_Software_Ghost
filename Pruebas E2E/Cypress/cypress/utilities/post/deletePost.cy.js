export class PostDelete {
    constructor () {
         this.TagPost = "a[data-test-nav=posts]";
         this.selectPost="a.ember-view.gh-btn.gh-btn-primary.view-actions-top-row";
         this.openMenu="a[data-test-psm-trigger=settings]";
         this.deletePost="button[data-ember-action=254]";
         this.confirmDelete="button[data-test-task-button-state=idle]";
    }
    
  
    
    visit() {
      cy.get(this.TagPost).click()
    }
  
    delete() {
      cy.get(this.selectPost).click()
      cy.get(this.openMenu).click()
      cy.get(this.deletePost).click()
      cy.get(this.confirmDelete).click()  
    }
    validate() {
        cy.get(this.newPostLabel).should('not.exist')
      }
    
    }
    
    export const DeletePost = new PostDelete(); 