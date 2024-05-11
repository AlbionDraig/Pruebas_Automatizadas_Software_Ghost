/*export class  PostSchedule {
    constructor() {
      this.labelPostside = "a[data-test-nav=new-story]";  //Le apunta al boton de post programado 
      this.titlePost = "textarea[data-test-editor-title-input]";
      this.textPost = "p[data-koenig-dnd-droppable=true]";
      this.publishPostUp = 'a[data-test-link="posts"]';
      this.verifyPost = "a.gh-list-data.gh-post-list-title";
    }
   
    visit() {
      cy.get(this.labelPostside).click();
    }
      create(title3, textPost3) {
      cy.get(newPageButtonPage).click();  
      cy.get(this.titlePost).type(title3);
      cy.get(this.textPost).type(textPost3);
      cy.get('div.gh-radio-button[data-test-radio="schedule"]').click();
      cy.get(this.publishPostUp).click();
    }
  
    validate(title3) {
      cy.get(this.verifyPost).contains(title3).should('exist');
    }
  }
  export const postSchedule = new PostSchedule();


*/